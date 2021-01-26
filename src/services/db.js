import { db, firestore, storage, storageRef } from '../firebase';

export async function getProducts(type="all") {
  let products = [];
  if (type === "all") {
    await db.collection("products").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        products.push(doc.data());
      });
    });
  } else {
    await db.collection("products").where("type", "==", type).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          products.push(doc.data());
      });
    });
  }
  return products;
}

export async function getProductsByID(idList) {
  let products = [];
  await db.collection("products").where('id', 'in', idList).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          products.push(doc.data());
      });
  });
  return products;
}

export async function getProduct(id) {
    let product = {};
    await db.collection("products").doc(id).get().then((documentSnapshot) => {
        product = documentSnapshot.data();
    });
    return product;
}

export async function addProduct(product) {
    let docRef = db.collection("products").doc();
    product.id = docRef.id;
    await docRef.set(product).catch((err) => console.log(err));
}

export async function addImage(image) {
    return new Promise(function(resolve, reject) {
      const uploadTask = storageRef.child('images/' + image.name).put(image);
      uploadTask.on(storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
          default:
            console.log("Unknown state");
            break;
        }
      }, function(error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          console.log("User unauthorized");
          break;
        case 'storage/canceled':
          // User canceled the upload
          console.log("User cancelled upload");
          break;
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          console.log("An unknown error occurred.", error.serverResponse);
          break;
        default:
          console.log("An unknown error occurred.");
      }
      reject();
    }, function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        resolve(downloadURL);
      });
    });
  });
}

export async function updateProductInventory(id, difference) {
  const decrement = firestore.FieldValue.increment(difference);
  let docRef = db.collection("products").doc(id);
  await docRef.set({inventory: decrement}, { merge: true });
}

export async function updateUserCart(user) {
    const userRef = db.collection("users").doc(user.id);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      return;
    }
    try {
      await userRef.set({
        cart: user.cart,
    }, { merge: true });
    } catch (error) {
      console.error("Error updating user cart", error);
    }
}

export async function generateUserDocument(user, firstName, lastName) {
    if (!user) return;
    const userRef = db.collection("users").doc(user.uid);
    const snapshot = await userRef.get();
    if (!snapshot.exists && firstName !== null) {
      try {
        await userRef.set({
            id: user.uid,
            firstName: firstName,
            lastName: lastName,
            email: user.email,
            role: "user",
            cart: {items: []},
            orderHistory: []
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  }

  async function getUserDocument(uid) {
    if (!uid) return null;
    try {
      const userDocument = await db.collection("users").doc(uid).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  }