import Link from "next/link";
import {
  Home,
  Gamepad2,
  Newspaper,
  Heart,
  Info,
  MessageCircle,
  Mail,
} from "lucide-react";
import {
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaDiscord,
  FaYoutube,
} from "react-icons/fa6";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/games", label: "Games", icon: Gamepad2 },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/donate", label: "Donate", icon: Heart },
  { href: "/about", label: "About", icon: Info },
];

const socialLinks = [
  { href: "https://discord.gg/67tRE3TjMr", label: "Discord", icon: FaDiscord },
  {
    href: "https://www.youtube.com/@BeanuttsGames",
    label: "YouTube",
    icon: FaYoutube,
  },
  { href: "https://x.com/Beanuttsss/", label: "X (Twitter)", icon: FaXTwitter },
  {
    href: "https://www.instagram.com/beanutts_games/",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://www.facebook.com/profile.php?id=61583124765984",
    label: "Facebook",
    icon: FaFacebook,
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-section">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-list">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link href={href} className="footer-link">
                    <Icon size={15} /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Get in Touch</h4>
            <ul className="footer-list">
              <li>
                <Link href="/contact" className="footer-link">
                  <MessageCircle size={15} /> Contact page
                </Link>
              </li>
              <li>
                <a
                  href="mailto:beanuttsgames@gmail.com"
                  className="footer-link"
                >
                  <Mail size={15} /> beanuttsgames@gmail.com
                </a>
              </li>
            </ul>

            <div className="footer-social">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-social-icon"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="divider_2" />

          <p>
            © {new Date().getFullYear()} Beanutts Games. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
