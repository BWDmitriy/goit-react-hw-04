import { FaPhone } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";

export default function Contact({ id, name, number, deleteId }) {
 return (
                  <li key={id}>
          <div className="contact-list-div">
            <span><IoPerson />{" "+name}</span>
            <span><FaPhone />{" "+number}</span>
          </div>
          <button onClick={() => deleteId(id)}>Delete</button>
        </li>
 );
}


