import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import './adminPanel.scss';
import { ButtonComponent } from 'components/Button/button';
import {
  getAllParameters,
  updateParameter,
} from 'services/generalParametersServices';
import { GeneralParameter } from 'services/types';
import ToastNotification from 'components/ToastNotification/ToastNotification';
import { TextField } from 'components/TextFields/textfield';
import { TextArea } from 'components/TextArea/textArea';

const GeneralInfos = () => {
  const [parameters, setParameters] = useState<GeneralParameter[]>([]);
  const [formData, setFormData] = useState({
    sobre: '',
    telefone: '',
    email: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [initialData, setInitialData] = useState({
    sobre: '',
    telefone: '',
    email: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [errors, setErrors] = useState({
    sobre: false,
    telefone: false,
    email: false,
    linkedin: false,
    youtube: false,
    instagram: false,
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('info');

  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const data = await getAllParameters();
        setParameters(data);

        const sobreParam =
          data.find((p) => p.parameter === 'SobreNos')?.content || '';
        const telefoneParam =
          data.find((p) => p.parameter === 'Telefone')?.content || '';
        const emailParam =
          data.find((p) => p.parameter === 'E-mail')?.content || '';
        const linkedinParam =
          data.find((p) => p.parameter === 'LinkedIn')?.content || '';
        const youtubeParam =
          data.find((p) => p.parameter === 'YouTube')?.content || '';
        const instagramParam =
          data.find((p) => p.parameter === 'Instagram')?.content || '';

        setFormData({
          sobre: sobreParam,
          telefone: telefoneParam,
          email: emailParam,
          linkedin: linkedinParam,
          youtube: youtubeParam,
          instagram: instagramParam,
        });

        setInitialData({
          sobre: sobreParam,
          telefone: telefoneParam,
          email: emailParam,
          linkedin: linkedinParam,
          youtube: youtubeParam,
          instagram: instagramParam,
        });
      } catch (error) {
        console.error('Erro ao carregar os parâmetros', error);
      }
    };

    fetchParameters();
  }, []);

  const validateForm = () => {
    const newErrors = {
      sobre: !formData.sobre,
      telefone: !formData.telefone,
      email: !formData.email,
      linkedin: !formData.linkedin,
      youtube: !formData.youtube,
      instagram: !formData.instagram,
    };
    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === false);
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

  const handleCancel = () => {
    setFormData(initialData);

    setToastMessage('Alterações canceladas e valores restaurados.');
    setToastType('info');
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const updates: GeneralParameter[] = [];

      const checkIfChanged = (
        parameterName: string,
        content: string,
        initialContent: string,
      ) => {
        if (content !== initialContent) {
          const param = parameters.find((p) => p.parameter === parameterName);
          if (param) {
            updates.push({ ...param, content });
          }
        }
      };

      checkIfChanged('SobreNos', formData.sobre, initialData.sobre);
      checkIfChanged('Telefone', formData.telefone, initialData.telefone);
      checkIfChanged('E-mail', formData.email, initialData.email);
      checkIfChanged('LinkedIn', formData.linkedin, initialData.linkedin);
      checkIfChanged('YouTube', formData.youtube, initialData.youtube);
      checkIfChanged('Instagram', formData.instagram, initialData.instagram);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (updates.length > 0) {
        await updateParameter(updates);
        setToastMessage('Dados salvos com sucesso!');
        setToastType('success');

        setInitialData(formData);
      } else {
        setToastMessage('Nenhuma alteração detectada.');
        setToastType('warning');
      }
    } catch (error) {
      setToastMessage('Erro ao salvar os dados.');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  const clearToast = () => {
    setToastMessage('');
  };

  return (
    <>
      {toastMessage && (
        <ToastNotification
          message={toastMessage}
          type={toastType}
          onClose={() => clearToast()}
        />
      )}

      <Grid item className="spacing" xs={12} sm={12} md={12}>
        <TextArea
          label="Sobre o Cosmos"
          name="sobre"
          value={formData.sobre}
          placeholder="Descreva o projeto"
          onChange={(e) => setFormData({ ...formData, sobre: e.target.value })}
          required
          errormessage={errors.sobre ? 'Campo obrigatório' : ''}
        />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Telefone (DD)"
            placeholder="(51) 99999-9999"
            mask="(99) 99999-9999"
            value={formData.telefone}
            onChange={(value: string) =>
              setFormData({ ...formData, telefone: value })
            }
            required
            errormessage={errors.telefone ? 'Campo obrigatório' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email Para Contato"
            placeholder="exemplo@dominio.com"
            value={formData.email}
            onChange={(value: string) =>
              setFormData({ ...formData, email: value })
            }
            required
            errormessage={errors.email ? 'Campo obrigatório' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="LinkedIn"
            placeholder="linkedin.com/in/user/"
            value={formData.linkedin}
            onChange={(value: string) =>
              setFormData({ ...formData, linkedin: value })
            }
            required
            errormessage={errors.linkedin ? 'Campo obrigatório' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="YouTube"
            placeholder="youtube.com/@user"
            value={formData.youtube}
            onChange={(value: string) =>
              setFormData({ ...formData, youtube: value })
            }
            required
            errormessage={errors.youtube ? 'Campo obrigatório' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Instagram"
            placeholder="instagram.com/user"
            value={formData.instagram}
            onChange={(value: string) =>
              setFormData({ ...formData, instagram: value })
            }
            required
            errormessage={errors.instagram ? 'Campo obrigatório' : ''}
          />
        </Grid>
      </Grid>
      <Box className="button-group-flex">
        <Box>
          <ButtonComponent type="secondary" onClick={handleCancel} size={2}>
            Cancelar
          </ButtonComponent>
        </Box>
        <Box className="cancel-btn">
          <ButtonComponent
            type="primary"
            onClick={handleSave}
            size={2}
            loading={loading}
            disabled={!isFormValid}
          >
            Salvar
          </ButtonComponent>
        </Box>
      </Box>
    </>
  );
};

export default GeneralInfos;
