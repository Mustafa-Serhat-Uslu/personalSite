const contacts = [
  "uslu.mserhat2@gmail.com",
  "linkedin.com/in/serhat-uslu/",
  "github.com/Mustafa-Serhat-Uslu ",
];

export const HeaderContacts = () => {
  return (
    <div>
      {contacts.map((contact) => (
        <h4 className="text-xs xl:text-lg mt-1">{contact}</h4>
      ))}
    </div>
  );
};
