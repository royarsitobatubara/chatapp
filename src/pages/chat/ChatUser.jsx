import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FaPhone, FaVideo } from "react-icons/fa6";
import EmojiPicker from 'emoji-picker-react';
import { FaSmile } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { ImFilePicture } from 'react-icons/im';
import { RiCloseLargeLine } from 'react-icons/ri';
import { MdDelete, MdEdit } from 'react-icons/md';
import { BiReply } from 'react-icons/bi';
import socket from '@/lib/socketClient';
import axios from 'axios';

function ChatUser({ photo = null, name = '', pengirim = null, penerima = null }) {
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const messageRefs = useRef({});

  const handleSendMessage = () => {
    if (!message.trim() && !preview) return;

    if (editId) {
      socket.emit('edit message', {
        idchat: editId,
        pesan: message
      });
      setEditId(null);
    } else {
      const data = {
        pengirim,
        penerima,
        pesan: preview ? preview : message,
        tipe: preview ? 'image' : 'text',
        replyTo: replyTo?.idchat || null
      };
      socket.emit('chat message', data);
    }

    setMessage('');
    setPreview(null);
    setReplyTo(null);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/chat/upload', formData);
      setPreview(res.data.imageUrl);
    } catch (err) {
      console.error('❌ Upload image error:', err);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleDelete = (idchat) => {
    socket.emit('delete message', { idchat });
    setChatList(prev => prev.filter(c => c.idchat !== idchat));
  };

  const handleEditStart = (chat) => {
    setMessage(chat.pesan);
    setEditId(chat.idchat);
  };

  const handleReply = (chat) => {
    setReplyTo(chat);
  };

  const scrollToMessage = (idchat) => {
    const el = messageRefs.current[idchat];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    if (pengirim && penerima) {
      axios.get(`/api/chat/${pengirim}_${penerima}`)
        .then(res => setChatList(res.data))
        .catch(err => console.error('❌ Fetch chat error:', err));
    }
  }, [pengirim, penerima]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      if ((msg.pengirim === pengirim && msg.penerima === penerima) ||
          (msg.pengirim === penerima && msg.penerima === pengirim)) {
        setChatList(prev => [...prev, msg]);
      }
    });

    socket.on('edit message', (msg) => {
      setChatList(prev => prev.map(c => c.idchat === msg.idchat ? { ...c, pesan: msg.pesan } : c));
    });

    socket.on('delete message', (msg) => {
      setChatList(prev => prev.filter(c => c.idchat !== msg.idchat));
    });

    return () => {
      socket.off('chat message');
      socket.off('edit message');
      socket.off('delete message');
    };
  }, [pengirim, penerima]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatList]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='w-full grid grid-rows-8 h-dvh'>
      {/* Header */}
      <div className='row-span-1 bg-[var(--black2)] px-4 w-full flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Image src={photo ? photo : '/images/avatar.jpeg'} width={50} height={50} className='rounded-full' alt="avatar" />
          <h2 className='font-bold'>{name || "Guest"}</h2>
        </div>
        <div className='flex gap-5 *:active:scale-95 *:cursor-pointer *:p-2 *:rounded-full *:hover:bg-[var(--blue1)] *:transition-all *:duration-300'>
          <button type="button"><FaVideo size={18} /></button>
          <button type="button"><FaPhone size={18} /></button>
        </div>
      </div>

      {/* Chat Area */}
      <div className='row-span-6 w-full p-4 space-y-2 overflow-y-auto'>
        {chatList.map((chat, i) => (
          <div key={chat.idchat || i} ref={el => messageRefs.current[chat.idchat] = el} className='flex w-full py-1'>
            <div className={`max-w-[70%] px-3 py-1 rounded-md text-sm overflow-hidden  relative ${chat.pengirim === pengirim ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-200 text-black'}`}>
              {chat.replyTo && (
                <div className='text-xs italic text-gray-300 border-l-4 border-white pl-2 mb-1 cursor-pointer hover:underline' onClick={() => scrollToMessage(chat.replyTo)}>
                  Replying to: {chatList.find(c => c.idchat === chat.replyTo)?.pesan || 'Deleted message'}
                </div>
              )}
              {chat.tipe === 'image' ? (
                <Image src={chat.pesan} alt="img" width={150} height={150} className="rounded-md" />
              ) : (
                chat.pesan
              )}
            <div className='flex '>
              {/* Reply bisa dilakukan oleh semua orang */}
              <button onClick={() => handleReply(chat)} className='text-sm text-black'><BiReply /></button>
              {/* Edit dan Hapus hanya untuk pengirim */}
              {chat.pengirim === pengirim && (
                <>
                  <button onClick={() => handleEditStart(chat)} className='text-sm'><MdEdit /></button>
                  <button onClick={() => handleDelete(chat.idchat)} className='text-sm'><MdDelete /></button>
                </>
              )}
            </div>

            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input Area */}
      <div className='row-span-1 bg-[var(--black2)] flex items-center px-10 gap-4 relative'>
        <div className='flex items-center bg-[var(--black3)] py-2 px-4 rounded-md gap-4 w-full relative'>
          <button type="button" className='cursor-pointer hover:scale-105 transition-all duration-200' onClick={() => setShowEmoji(!showEmoji)}>
            <FaSmile size={15} />
          </button>

          {showEmoji && (
            <div className='absolute bottom-[45px] left-0 z-10'>
              <EmojiPicker onEmojiClick={(e) => setMessage(prev => prev + e.emoji)} theme='dark' />
            </div>
          )}

          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown} placeholder='Type here...' className='text-sm outline-none w-full border-none bg-transparent text-white' />

          <button type="button" onClick={handleEditClick} className='cursor-pointer hover:scale-105 transition-all duration-200'>
            <ImFilePicture size={15} />
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className='hidden' />
        </div>

        <button type="button" className='p-2 bg-[var(--blue1)] rounded-full cursor-pointer active:scale-95' onClick={handleSendMessage}>
          <IoIosSend size={20} />
        </button>

        {preview && (
          <div className='absolute bottom-full left-10 bg-[var(--black2)] px-4 py-2 rounded-t-md'>
            <div className='w-full'>
              <button type="button" onClick={() => setPreview(null)} className='float-end py-2 active:scale-95 cursor-pointer'><RiCloseLargeLine size={20} /></button>
            </div>
            <Image src={preview} width={200} height={200} alt="preview" />
          </div>
        )}

        {replyTo && (
          <div className='absolute bottom-full left-10 bg-[var(--black2)] px-4 py-2 rounded-t-md w-1/2 text-sm text-white flex justify-between'>
            <div className='truncate'>Replying to: {replyTo.pesan}</div>
            <button onClick={() => setReplyTo(null)} className='ml-2'><RiCloseLargeLine size={18} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatUser;
