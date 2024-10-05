import { FaFacebook, FaTwitter, FaTelegram, FaWhatsapp, FaReddit } from "react-icons/fa";

interface SocialShareProps {
  url: string; // L'URL dell'articolo da condividere
  title: string; // Il titolo dell'articolo da condividere
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        <FaFacebook size={30} />
      </a>

      {/* X (ex Twitter) */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
      >
        <FaTwitter size={30} />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp size={30} />
      </a>

      {/* Telegram */}
      <a
        href={`https://telegram.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Telegram"
      >
        <FaTelegram size={30} />
      </a>

      {/* Reddit */}
      <a
        href={`https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Reddit"
      >
        <FaReddit size={30} />
      </a>
    </div>
  );
};

export default SocialShare;
