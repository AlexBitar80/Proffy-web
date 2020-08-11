import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import warningIcon from '../../assets/images/icons/warning.svg';
import Select from '../../components/Select';

import './styles.css';

function TeacherForm() {
  const history = useHistory()

  const [name, setName ] = useState('');
  const [avatar, setAvatar ] = useState('');
  const [whatsapp, setWhatsapp ] = useState('');
  const [bio, setBio ] = useState('');

  const [subject, setSubject ] = useState('');
  const [cost, setCost ] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: ''}
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: ''}
    ]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return {...scheduleItem, [field]:value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItem)
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems,
    }).then(() => {
      alert('Cadastro realizado com sucesso!');

      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro!')
    })
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrivel que você quer dar aulas."
        description="O primeiro passo é prencher o formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="nome completo"
              value={name}
              onChange={(event) => { setName(event.target.value) }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(event) => { setAvatar(event.target.value) }}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(event) => { setWhatsapp(event.target.value) }}
            />

            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(event) => { setBio(event.target.value) }}
            />

          </fieldset>


          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(event) => { setSubject(event.target.value) }}
              options={[
                { value: 'Artes', label: 'Artes'},
                { value: 'Biologia', label: 'Biologia'},
                { value: 'Química', label: 'Química'},
                { value: 'História', label: 'História'},
                { value: 'Física', label: 'Física'},
                { value: 'Educação Física', label: 'Educação Física'},
                { value: 'Português', label: 'Português'},
                { value: 'Matemática', label: 'Matemática'},
              ]}
            />
            <Input
              value={cost}
              onChange={(event) => {setCost(event.target.value)}}
              name="cost"
              label="Custo da sua hora por aula"
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
              <Select
                  name="week day"
                  value={scheduleItem.week_day}
                  label="Dia da semana"
                  onChange={event => setScheduleItemValue(index, 'week_day', event.target.value)}
                  options={[
                    { value: '0', label: 'Domingo'},
                    { value: '1', label: 'Segunda'},
                    { value: '2', label: 'Terça'},
                    { value: '3', label: 'Quarta'},
                    { value: '4', label: 'Quinta'},
                    { value: '5', label: 'Sexta'},
                    { value: '6', label: 'Sábado'},
                  ]}
                />
                  <Input
                    name="from"
                    label="Das"
                    value={scheduleItem.from}
                    type="time"
                    onChange={event => setScheduleItemValue(index, 'from', event.target.value)}
                  />
                  <Input
                    name="to"
                    value={scheduleItem.to}
                    label="Até"
                    type="time"
                    onChange={event => setScheduleItemValue(index, 'to', event.target.value)}
                  />

                </div>
              );
            })}

          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante"/>
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;
