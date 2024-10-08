import { FaFacebook, FaWhatsappSquare, FaTelegram, FaWhatsapp, FaReddit, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { PiPrinterFill } from "react-icons/pi";

interface SocialShareProps {
  url: string; // L'URL dell'articolo da condividere
  title: string; // Il titolo dell'articolo da condividere
}
const color_icon = 'black'
const size_icon = 25


const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <>
      <hr />
      <h4 className=" text-xl">Condividi l&apos;articolo: </h4>
      <nav style={{ display: "flex", gap: "10px" }}>
        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          title="Facebook"
        >
          <FaFacebook color={color_icon} size={size_icon} />
        </a>

        {/* X (ex Twitter) */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          title="X (ex Twitter)"
        >
          <FaSquareXTwitter color={color_icon} size={size_icon} />
        </a>

        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          title="WhatsApp"
        >
          <FaWhatsappSquare color={color_icon} size={size_icon} />
        </a>

        {/* Telegram */}
        <a
          href={`https://telegram.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Telegram"
          title="Telegram"
        >
          <FaTelegram color={color_icon} size={size_icon} />
        </a>
        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          title="LinkedIn"
        >
          <FaLinkedin color={color_icon} size={size_icon} />
        </a>

        {/* Reddit */}
        <a
          href={`https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Reddit"
          className="hover:opacity-75"
          title="Reddit"
        >
          <FaReddit color={color_icon} size={size_icon} />
        </a>
        {/* Email */}
        <a
          href={`mailto:?subject=${encodedTitle}&body=Check%20out%20this%20article:%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share via Email"
          title="Email"
        >
          <FaEnvelope color={color_icon} size={size_icon} />
        </a>

        {/* Stampante */}
        <button 
        onClick={() => window.print()} 
        aria-label="Print this article" 
        className="hover:pointer-events-auto"
        title="Stampa"
        >
          <PiPrinterFill color={color_icon} size={size_icon} />
        </button>
      </nav>
      <hr />
    </>

  );
};

export default SocialShare;
