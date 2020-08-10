import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';


function TeacherList() {
  const [teachers, setTeachers ] = useState([]);

  const [subject, setSubject ] = useState('');
  const [week_day, setWeekDay ] = useState('');
  const [time, setTime ] = useState('');

  async function searchTeachers(event: FormEvent) {
    event.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={event => { setSubject(event.target.value) }}
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
          <Select
            name="week_day"
            value={week_day}
            onChange={event => { setWeekDay(event.target.value) }}
            label="Dia da semana"
            options={[
              { value: '0', label: 'Segunda'},
              { value: '1', label: 'Terça'},
              { value: '2', label: 'Quarta'},
              { value: '3', label: 'Quinta'},
              { value: '4', label: 'Sexta'},
              { value: '5', label: 'Sábado'},
              { value: '6', label: 'Domingo'},
            ]}
          />
          <Input
            value={time}
            onChange={event => { setTime(event.target.value) }}
            type="time"
            name="time"
            label="Hora"
          />

          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher ) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </main>
    </div>
  )
}

export default TeacherList;
