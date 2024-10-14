// authService.js
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc,getDoc } from "firebase/firestore";

// Función para registrar un nuevo usuario
export const registerUser = async (username, email, password, role) => {
  try {
    // Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar información adicional del usuario en Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
      role: role,
      createdAt: new Date(),
    });

    console.log("Usuario registrado exitosamente");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
  }
};

// Función para obtener el rol del usuario
export const getUserRole = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        return userDoc.data().role;
      } else {
        console.log("No se encontró el usuario");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el rol del usuario:", error);
      return null;
    }
  };
