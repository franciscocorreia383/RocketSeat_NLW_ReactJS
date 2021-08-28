import React, { useState, FormEvent, useEffect } from 'react'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import '../styles/room.scss'
import { RoomCode } from './RoomCode'
import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { Question } from '../components/Question/index'
import { useRoom } from '../hooks/useRoom'



type RoomParams = {
    id: string;
}


export function AdminRoom(){

    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {user} = useAuth();

    const { questions, title} = useRoom(roomId)

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask Logo"/>
                    <div>
                    <RoomCode code={roomId}/>
                    <Button isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala: {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {console.log(questions)}
                    {questions.map(question => {
                         {console.log(question)}
                        return(
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            />
                        )
                    })}
                </div>
            </main>
        </div>
    );
}