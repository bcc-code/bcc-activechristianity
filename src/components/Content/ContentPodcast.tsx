import * as React from 'react'
import Link from '@/components/CustomLink'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { IPostAuthors } from '@/types'
import Content from '@/components/Content'
import TS from '@/strings'
import { normalizeAuthors } from '@/helpers'

interface IContentPodcast {
    episodeNotes?: string
    transcript: string
    hosts: IPostAuthors[]
}

const ContentPodcast: React.FC<IContentPodcast> = ({ episodeNotes, transcript, hosts }) => {
    const [tabIndex, setTabIndex] = React.useState(1)
    React.useEffect(() => {
        setTabIndex(0)
    }, [transcript])


    return (
        <div>
            <Tabs selectedIndex={tabIndex} onSelect={tabIndex => setTabIndex(tabIndex)}>
                <TabList>
                    {episodeNotes && <Tab>Episode Notes </Tab>}
                    <Tab>Transcript</Tab>
                </TabList>
                {episodeNotes && (
                    <TabPanel>
                        <div className="py-4"  >
                            <Content content={episodeNotes} />
                        </div>

                    </TabPanel>
                )}
                <TabPanel>
                    <div className="py-4"  >
                        <Content content={transcript} />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div>
                        {hosts.map(group => {
                            group.authors.map(item => {
                                return (
                                    <div className="flex flex-col w-full border-b">
                                        <div className="flex items-center py-6">
                                            {item.image && (
                                                <div className="max-w-12 mb-4">
                                                    <img src={item.image.src} alt="" style={{ borderRadius: "50%", filter: 'grayscale(100%)' }} />
                                                </div>
                                            )}
                                            <h2 className="text-center mb-4 font-seminbold mx-4">{item.name}</h2>
                                        </div>
                                        {item.excerpt && <Content content={item.excerpt} />}

                                        {item.to && (
                                            <Link className="text-d4secondary py-4" to={`${TS.slug_ac_author}/${item.to}`}>More from {item.name}</Link>
                                        )}
                                    </div>
                                )
                            })
                        }
                        )}
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default ContentPodcast