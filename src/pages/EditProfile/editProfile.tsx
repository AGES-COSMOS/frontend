import React, { useEffect, useState } from 'react';
import { TextField } from 'components/TextFields/textfield';
import { Select } from 'components/Select/select';
import { ButtonComponent } from 'components/Button/button';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import './editProfile.scss';
import Loading from 'components/Loading/loading';
import { updateUser, getUser } from '../../services/userService';
import { getSocialNetworks } from '../../services/socialNetworkService';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  cpfcnpj?: string;
  photoURL?: string | null;
  blocked: boolean;
  registration_number?: string | null;
  institution_id: number;
  role_id: number;

  institution: {
    name: string;
  };

  UsersSocialNetwork: {
    social_network_URL: string;
    social_network: {
      name: string;
      icon: string;
    };
  }[];
}

interface SocialNetwork {
  id: number;
  name: string;
  icon: string;
}

// Mocked data
const states = [{ code: '1', name: 'Rio Grande do Sul' }];

const cities = [
  { name: 'Porto Alegre', stateCode: '1' },
  { name: 'São Leopoldo', stateCode: '1' },
  { name: 'Canoas', stateCode: '1' },
];

export const EditProfile = () => {
  //substituir pelo ID real quando tiver login
  const mockedUserId = 1;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(mockedUserId);
        setUpdatedUser(userData);
        setProfileImage(userData.photoURL);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSocialNetworks = async () => {
      try {
        const networks = await getSocialNetworks();
        setSocialNetworks(networks);
      } catch (error) {
        console.error('Erro ao carregar redes sociais:', error);
      }
    };

    fetchUser();
    fetchSocialNetworks();
  }, [mockedUserId]);

  const handleInputChange = (field: keyof User, value: string) => {
    setUpdatedUser((prevUser) =>
      prevUser ? { ...prevUser, [field]: value } : prevUser,
    );
  };

  const handleSubmit = async () => {
    if (updatedUser) {
      try {
        await updateUser(updatedUser.id, updatedUser);
      } catch (error) {
        console.error('Erro ao atualizar o perfil:', error);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setUpdatedUser((prevUser) =>
          prevUser
            ? { ...prevUser, photoURL: reader.result as string }
            : prevUser,
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const getUserSocialNetworkURL = (networkName: string) => {
    const foundNetwork = updatedUser?.UsersSocialNetwork?.find(
      (userNetwork) => userNetwork.social_network.name === networkName,
    );
    return foundNetwork ? foundNetwork.social_network_URL : '';
  };

  if (loading) return <Loading />;

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Box className="profile-edit">
      <h1 className="profile-title">Editar Perfil</h1>
      <Box className="profile-header">
        <img
          src={profileImage || '/assets/default-avatar.png'}
          alt="Profile"
          className="profile-photo"
        />
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <EditIcon
          className="edit-icon"
          onClick={() => document.getElementById('imageInput')?.click()}
        />
      </Box>
      <Box className="profile-fields">
        <TextField
          label="Nome"
          placeholder="Digite seu nome"
          value={updatedUser?.name ?? ''}
          onChange={(v) => handleInputChange('name', v)}
          required
        />
        <TextField
          label="E-mail"
          placeholder="Digite seu e-mail"
          value={updatedUser?.email ?? ''}
          onChange={(v) => handleInputChange('email', v)}
          required
        />
        {updatedUser?.role_id === 2 && (
          <TextField
            label="CNPJ"
            placeholder="Digite seu CNPJ"
            value={updatedUser?.cpfcnpj || ''}
            onChange={(v) => handleInputChange('cpfcnpj', v)}
            mask="99.999.999/9999-99"
            required
          />
        )}
        {updatedUser?.role_id !== 2 && (
          <>
            <TextField
              label="Matrícula"
              placeholder="Digite sua matrícula"
              value={updatedUser?.registration_number || ''}
              onChange={(v) => handleInputChange('registration_number', v)}
            />
            <TextField
              label="CPF"
              placeholder="Digite seu CPF"
              value={updatedUser?.cpfcnpj || ''}
              onChange={(v) => handleInputChange('cpfcnpj', v)}
              mask="999.999.999-99"
              required
            />
          </>
        )}
        <TextField
          label="Telefone"
          placeholder="Digite seu telefone"
          value={updatedUser?.phone || ''}
          onChange={(v) => handleInputChange('phone', v)}
          mask="+55 (99) 99999-9999"
          required
        />
        {socialNetworks.map((network) => (
          <TextField
            key={network.id}
            label={network.name}
            placeholder={`Digite seu ${network.name}`}
            value={getUserSocialNetworkURL(network.name) || ''}
            onChange={(v) =>
              handleInputChange(network.name.toLowerCase() as keyof User, v)
            }
          />
        ))}
        {updatedUser?.role_id !== 2 && (
          <div className="institution-display">
            <label>Instituição</label>
            <p>
              {updatedUser?.institution.name || 'Nenhuma instituição associada'}
            </p>
          </div>
        )}
        <Select
          options={states.map((state) => state.name)}
          label="Estado"
          value=""
          onChange={(v) => console.log('Estado:', v)}
        />
        <Select
          options={cities.map((city) => city.name)}
          label="Cidade"
          value=""
          onChange={(v) => console.log('Cidade:', v)}
        />
        {updatedUser?.role_id === 2 && (
          <>
            <TextField
              label="Endereço"
              placeholder="Digite seu endereço"
              value=""
              onChange={(v) => console.log('Endereço:', v)}
            />
            <TextField
              label="Número"
              placeholder="Digite o número"
              value=""
              onChange={(v) => console.log('Número:', v)}
            />
          </>
        )}
      </Box>
      <ButtonComponent type="primary" onClick={handleSubmit} size={1}>
        Confirmar
      </ButtonComponent>
    </Box>
  );
};
