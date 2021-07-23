
import React from "react"
import { Button } from '@/components/Button'
import ac_strings from '@/strings/ac_strings.js'
import bookShopLogo from '@/images/BookShopLogo.svg'
const BookShop = () => {
    return (
        <div className="rounded-lg border pt-4 pb-8 my-4">
            <div className="border-b px-4 mb-4 ">
                <img className="pb-4" src={bookShopLogo} alt={ac_strings.banner_ebook_title} />
            </div>
            <div className="px-4 text-sm">{ac_strings.banner_ebook_content}</div>

            <Button
                className="text-sm sm:text-base mx-4 mt-4 text-ac-secondary"
                href={ac_strings.banner_ebook_cta_url}
            >
                {ac_strings.banner_ebook_cta_label}
            </Button>

        </div>
    )
}

export default BookShop