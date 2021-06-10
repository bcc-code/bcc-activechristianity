
import React from "react"
import { Button } from '@/components/Button'
import ac_strings from '@/strings/ac_strings.js'

const BookShop = () => {
    return (
        <div className="rounded-lg border pt-4 pb-8 my-4">
            <h6 className="text-ac-slate-dark text-lg font-bold pb-4 border-b mb-4 px-4">{ac_strings.banner_ebook_title}</h6>
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