import { useEffect, useState } from "react";
import Element from "./Element";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const Main = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    const getData = async () => {
      if (user) {
        const querySnapshot = await getDocs(
          collection(db, "users", user?.email, "books")
        );

        // get all the objects in the books array from the querySnapshot
        const addbook = querySnapshot?.docs.map((doc) => doc.data());
        setBooks(addbook);
      } else {
        setBooks([]);
      }
    };

    getData();
  }, [user]);

  console.log(books);

  return (
    <div className="md:p-10 py-10 px-4 flex justify-center md:justify-around lg:justify-center items-stretch space-y-5 md:space-x-10 flex-wrap">
      {user ? (
        <>
          {books.map((book) => {
            return (
              <Element
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                genre={book.genre}
                rating={book.rating}
                img={book.imageUrl}
              />
            );
          })}
        </>
      ) : (
        <div>
          <h1 className="text-white text-center mx-auto text-4xl font-bold">
            Login/SignUp to add your read books to the Virary
          </h1>
          <img
            src="https://i.ibb.co/Ry8SKBF/virary2.png"
            className="rounded-full mx-auto p-5"
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default Main;
