import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import '../styles/BlocUserInfo.css';

function UserInfo({ url, token }) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const profilData = JSON.parse(localStorage.getItem('profil'));
  const userId = profilData.userId;

  const [file, setFile] = useState();
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(url + "user/" + userId, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  const EditProfil = (e) => {
    e.preventDefault();

    let formData = new FormData();

    if (file) {
      formData.append("image", file);
    }

    formData.append("pseudo", userInfo.pseudo);
    formData.append("email", userInfo.email);
    formData.append("bio", newBio);

    axios
      .put(url + 'user/' + userId, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Le Profil a été modifié avec succès !',
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/accueil");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function changeImage(event) {
    const file = event.target.files[0];
    setFile(file);

    const reader = new FileReader();

    reader.onload = function (e) {
      const imageProfil = document.getElementById("imageProfil");
      imageProfil.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  const toggleEditBio = () => {
    setEditingBio(!editingBio);
  };

  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };

  return (
    <div className="blocprofil">
      <div className="blocprofilflex">
        <div>
          <p>Pseudo : {userInfo.pseudo}</p>
          <p>Email : {userInfo.email}</p>
          {editingBio ? (
            <div>
              <p>A propos de moi :</p>
              <textarea value={newBio} onChange={handleBioChange} />
            </div>
          ) : (
            <p>A propos de moi :<br/> {userInfo.bio}</p>
          )}
        </div>
        <div className="blocprofilimage">
          <img id="imageProfil" className="imageprofil" alt="" src={userInfo.picture} />
          <label htmlFor="file" title="Modifier" className="changeimage"><p> Modifier image ?</p></label>
          <input id="file" className="input-file" type="file" accept="image/png, image/jpg, image/jpeg" onChange={changeImage} />
        </div>
      </div>
      <div>
        {editingBio ? (
          <button onClick={toggleEditBio}>Annuler</button>
        ) : (
          <button onClick={toggleEditBio}>Modifier la bio</button>
        )}
      </div>
      <input className="" type="submit" value="Modifier" onClick={EditProfil} />
    </div>
  );
}

export default UserInfo;