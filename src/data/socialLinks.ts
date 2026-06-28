import Strings from "@/constants/strings";
import type { ISocialLinkItem } from "@/types";

const socialLinks: ISocialLinkItem[] = [
  {
    name: Strings.github,
    url: Strings.githubLink,
    text: Strings.githubUsername,
  },
  {
    name: Strings.linkedIn,
    url: Strings.linkedInLink,
    text: Strings.linkedInUsername,
  },
  {
    name: Strings.telegram,
    url: Strings.telegramLink,
    text: Strings.telegramUsername,
  },
  {
    name: Strings.instagram,
    url: Strings.instagramLink,
    text: Strings.instagramUsername,
  },
  {
    name: Strings.twitter,
    url: Strings.twitterLink,
    text: Strings.twitterUsername,
  },
  {
    name: Strings.email,
    url: Strings.primaryEmailLink,
    text: Strings.primaryEmail,
  },
  {
    name: Strings.buyMeACoffee,
    url: Strings.buyMeACoffeeLink,
    icon: "/images/buy-me-a-coffee.png",
    text: Strings.buyMeACoffeeUsername,
  },
  {
    name: Strings.koFi,
    url: Strings.koFiLink,
    icon: "/images/ko-fi.png",
    text: Strings.buyMeACoffeeUsername,
  },
];

export default socialLinks;
