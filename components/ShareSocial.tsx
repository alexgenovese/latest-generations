import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
  } from 'next-share'

export default function Sharesocial({
    url_to_share
}) {
    

    return (
        <div className="bg-white w-full h-auto py-8 flex items-left justify-left gap-2 flex-wrap">
            <FacebookShareButton
                url={url_to_share}
                quote={process.env.title_og + "|" + process.env.desc_og}
                hashtag={'#reica'}
                >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
                url={url_to_share}
                title={process.env.title_og + "|" + process.env.desc_og}
                >
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={url_to_share}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
       </div>
    )
}