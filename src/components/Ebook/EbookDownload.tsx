import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openSignInModal } from '@/state/action'

import Carousel from '@/components/Carousel'
import DownloadFile, { API_URL } from '@/helpers/download'
import Icon from '@/components/Icons'

import ModalWProps from '@/components/Modal/ModalWProps'

import { IRootState } from '@/state/types'
import { INavItem } from '@/types'
import ac_strings from '@/strings/ac_strings.json'
import TS from '@/strings'

interface IEbookDOwnload {
    languageOptions: INavItem[]
    previewImages: string[]
    title: string
    id: string
}

const EbookDownload: React.FC<IEbookDOwnload> = ({ languageOptions, previewImages, title, id }) => {
    const dispatch = useDispatch()
    const authInfo = useSelector((state: IRootState) => state.auth);

    const download = (url: string, filename: string) => {
        const dataLayer = (window as any).dataLayer = (window as any).dataLayer || [];


        DownloadFile(url, filename).then((succeeded: boolean) => {
            dataLayer.push({
                event: 'ac.gtm_track_ebook_download_success',
                label: filename
            })

        }).catch(error => {
            dataLayer.push({
                event: 'ac.gtm_track_ebook_download_error',
                label: filename,
                message: error.message
            })
        })
    }


    const replaceTextWithLink = (text: string, closeModal: () => void, ...links: string[]) => {
        const handleSignsin = () => {
            closeModal()
            dispatch(openSignInModal("signInOptions"))

        }

        if (text !== undefined) {
            let textArray: any[] = text.split('$$');
            for (let i = 0; i < links.length; i++) {
                const k = 2 * i + 1;
                if (textArray[k] !== undefined) {
                    textArray[k] = <button className="text-d4secondary" key={i} onClick={handleSignsin}>{textArray[k]}</button>
                }
            };
            return textArray.map(item => item);
        } else {
            return null
        }
    }


    const handleSelect = (option: INavItem) => {
        const { to, name } = option
        download(
            to,
            `${title} – ${name}.epub`
        )
    }
    const previewButton = (
        <button
            className="flex items-center justify-center py-2 mr-2"
        >
            <Icon name="eye" size="xl" />
            <span className="px-2">{ac_strings.preview}</span>
        </button>
    )

    const downloadButton = (
        <button className="flex items-center justify-center py-2 mr-2">
            <Icon name="download" size="xl" />
            <div className="px-2">
                {TS.download}
            </div>
        </button>

    )

    const downloadModal = (
        <ModalWProps
            trigger={downloadButton}
            content={(props: any) => {
                return (
                    <div className="p-4 w-11/12 flex flex-col items-center justify-center">
                        {authInfo.loggedIn !== "success" ? (
                            <div className="w-full">
                                <div className="text-center">{replaceTextWithLink(TS.please_login_download, props.closeModal, ac_strings.slug_login, ac_strings.slug_register,)}</div>
                                <p className="text-center mt-4">{TS.also_available_in} </p>
                                {languageOptions.map(item => {
                                    return (
                                        <button className="block text-gray-600 text-center py-2">{item.name}</button>
                                    )
                                })}
                            </div>
                        ) : (
                                <div className="py-8">
                                    {languageOptions.map(item => {
                                        return (
                                            <button className="block text-gray-600 text-center py-2" onClick={() => handleSelect(item)}>{item.name}</button >
                                        )
                                    })}
                                </div>
                            )}
                    </div>
                )
            }}
            contentLabel="Ebook preview"
        />
    )

    const previewModal = (
        <ModalWProps
            trigger={previewButton}
            content={(props: any) => {
                return (
                    <Carousel images={previewImages} />
                )
            }}
            contentLabel="Ebook preview"
        />
    )

    return (
        <div className="w-full flex items-center justify-center text-xs sm:text-base pt-4 sm:w-auto text-d4secondary font-bold opacity-75 sm:opacity-100">
            {previewModal}
            {downloadModal}
        </div>
    )
}

export default EbookDownload