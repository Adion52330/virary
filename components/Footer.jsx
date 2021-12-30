import { useEffect, useState } from "react";
import { auth } from "../firebase";

const Footer = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <div>
      {/* Create a cool footer */}
      {user && (
        <footer className="bg-main-blue text-white p-5 text-center flex items-center justify-center space-x-1">
          <p>
            Created by{" "}
            <a
              href="https://adion.vercel.app/"
              className="text-yellow-500"
              target="_blank"
            >
              Adion
            </a>{" "}
            | &copy; Copyright 2021. All rights reserved |{" "}
          </p>
          <p>
            <span className="flex items-center space-x-2">
              <p>Virary </p>
              <img
                src="https://i.ibb.co/Ry8SKBF/virary2.png"
                className="rounded-full h-5"
                alt=""
              />
            </span>
          </p>
        </footer>
      )}
    </div>
  );
};

export default Footer;
