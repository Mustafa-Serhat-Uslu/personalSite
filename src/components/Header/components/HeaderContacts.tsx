import { GitHubLogo, GmailLogo, LinkedInLogo } from "@/info/logos";

const contacts: Record<string, { link: string; logo: any }> = {
  mail: { link: "mailto:uslu.mserhat2@gmail.com", logo: <GmailLogo /> },
  linkedIn: {
    link: "https://linkedin.com/in/serhat-uslu/",
    logo: <LinkedInLogo />,
  },
  gitHub: {
    link: "https://github.com/Mustafa-Serhat-Uslu",
    logo: <GitHubLogo />,
  },
};

export const HeaderContacts = () => {
  return (
    <div className="flex gap-4">
      {Object.keys(contacts).map((key) => {
        const { link, logo } = contacts[key];

        return (
          <div className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-125">
            <a
              href={link}
              target="_blank"
              className="mt-1 transform text-xs xl:text-base"
            >
              {logo}
            </a>
          </div>
        );
      })}
    </div>
  );
};
