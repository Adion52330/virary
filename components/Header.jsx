import Head from "next/head";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Rating } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isbn, setIsbn] = useState("");
  const [rating, setRating] = useState(0.5);
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const searchIsbn = () => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.totalItems > 0) {
          setTitle(data.items[0].volumeInfo.title);
          setAuthor(data.items[0].volumeInfo.authors[0]);
          setGenre(data.items[0].volumeInfo.categories);
          setDescription(data.items[0].volumeInfo.description);
          setRating(data.items[0].volumeInfo.averageRating);
          setImageUrl(data.items[0].volumeInfo.imageLinks.thumbnail);

          setOpen(true);
        } else {
          alert("No book found");
        }
      });
  };

  //   login with firebase
  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        setUser(userCredential.user);
        console.log(userCredential.user);
        setLoginOpen(false);
        // location.reload();
        await setDoc(doc(db, "users", userCredential.user.email), {
          email: userCredential.user.email,
          name: userCredential.user.displayName,
          photoUrl: userCredential.user.photoURL,
          uid: userCredential.user.uid,
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
        setLoginOpen(false);

        // ..
      });
  };
  // check if user is authenticated then setUser = user
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        setUser(userCredential.user);
        console.log(user);
        setSignupOpen(false);
        // location.reload();
        // Create a new firestore doc with the user's uid
        await setDoc(doc(db, "users", userCredential.user.email), {
          email: userCredential.user.email,
          name: userCredential.user.displayName,
          photoUrl: userCredential.user.photoURL,
          uid: userCredential.user.uid,
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
        setSignupOpen(false);
        // ..
      });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const nopen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // random alphanumeric generator
  const randomString = (length) => {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const addBook = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "users", user?.email, "books", randomString(10)), {
      isbn: isbn,
      title: title,
      author: author,
      genre: genre,
      description: description,
      rating: rating,
      imageUrl: imageUrl,
      user: user.email,
    })
      .then(() => {
        setOpen(false);
        location.reload();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="flex sticky top-0 w-full z-50 justify-around py-5 bg-main-blue shadow-lg border-b-2 border-gray-600">
      <Head>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossorigin="anonymous"
        />
      </Head>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {user ? (
          <Box sx={style}>
            {/* Create a form where user can input books */}
            <div className="flex justify-between">
              <Typography variant="h6" id="modal-modal-title">
                Add a book
              </Typography>
              <div onClick={handleClose}>
                <i class="fas fa-times"></i>
              </div>
            </div>
            <Typography variant="subtitle1" id="modal-modal-description">
              Once added it can't be deleted.
            </Typography>
            <form className="flex flex-col space-y-4 justify-center w-full">
              <div className="flex space-x-2 justify-between items=center">
                <TextField
                  type="text"
                  label="ISBN(Recommended)"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                />
                <Button color="primary" variant="outlined" onClick={searchIsbn}>
                  <i class="fas fa-search"></i>
                </Button>
              </div>
              <p className="text-center">or</p>
              <TextField
                type="text"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <TextField
                type="text"
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />

              <TextField
                type="text"
                label="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />

              <Rating
                name="size-small"
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                className="mx-auto"
                precision={0.5}
                defaultValue={4.5}
                size="large"
              />

              <TextField
                type="text"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <TextField
                type="url"
                label="Image Url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />

              <Button
                type="submit"
                variant="outlined"
                color="secondary"
                onClick={addBook}
              >
                Add Book
              </Button>
            </form>
          </Box>
        ) : (
          <Box sx={style}>
            <Typography variant="h6" id="modal-modal-title">
              Please login/signup if you want to add a book to your virtual
              library
            </Typography>
          </Box>
        )}
      </Modal>
      <Modal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Create a login form with email and password */}
          <Typography variant="h6" id="modal-modal-title">
            Login
          </Typography>
          <Typography variant="subtitle1" id="modal-modal-description">
            Login to your account
          </Typography>
          <form className="flex flex-col space-y-4 justify-center w-full">
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              onClick={login}
            >
              Login
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Create a login form with email and password */}
          <Typography variant="h6" id="modal-modal-title">
            Sign Up
          </Typography>
          <Typography variant="subtitle1" id="modal-modal-description">
            Sign Up for a new account
          </Typography>
          <form className="flex flex-col space-y-4 justify-center w-full">
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              onClick={signUp}
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Modal>
      <div
        className="text-white cursor-pointer flex space-x-2 items-center rounded-lg px-4 py-2 bg-main-black hover:opacity-50 transition active:translate-y-1"
        onClick={handleOpen}
      >
        <i class="fas fa-plus"></i>
        <button>Add Book</button>
      </div>
      <div className="flex space-x-2">
        {user ? (
          <div className="flex items-center space-x-1">
            <div
              className="text-white cursor-pointer flex space-x-2 items-center rounded-lg px-4 py-2 bg-main-black hover:opacity-50 transition active:translate-y-1"
              onClick={() => {
                signOut(auth);
                // location.reload();
              }}
            >
              <i class="fas fa-sign-out-alt"></i>
              <button>Sign Out</button>
            </div>
          </div>
        ) : (
          <>
            <div
              className="text-white cursor-pointer flex space-x-2 items-center rounded-lg px-4 py-2 bg-main-black hover:opacity-50 transition active:translate-y-1"
              onClick={() => setLoginOpen(true)}
            >
              <i class="fas fa-sign-in-alt"></i>
              <button>Login</button>
            </div>
            <div
              className="text-white cursor-pointer flex space-x-2 items-center rounded-lg px-4 py-2 bg-main-black hover:opacity-50 transition active:translate-y-1"
              onClick={() => setSignupOpen(true)}
            >
              <i class="fas fa-sign-in-alt"></i>
              <button>Sign Up</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
