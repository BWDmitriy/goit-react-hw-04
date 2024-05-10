import Contact from "../Contact/Contact";

export default function ContactList({ contacts, onDeleteContact }) {
 return (
    <ul className="contact-list">
     {contacts.map(contact => (
        <Contact id={contact.id} name={contact.name} number={contact.number} deleteId={onDeleteContact} />
      ))}
    </ul>
 );
}


