import { useState, useEffect } from 'react';
import './App.css';
import { Header, Container, CardList, CreateCardModal, Popup, DetailCardModal, ModifyCardModal } from './components';
import { users, voteList } from './mocks';
import { makeVoteId, formatVoteList, findVoteInfo, updateVoteList, deleteVoteList } from './utils';
import { ToastProvider } from 'react-toast-notifications';

function App() {
  const [user, setUser] = useState(users[0]);
  const [voteData, setVoteData] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [voteInfo, setVoteInfo] = useState({});
  const [popupText, setPopupText] = useState(false);
  const [selectItemId, setSelectItemId] = useState('');
  const [endVote, setEndVote] = useState([]);
  const [progressVote, setProgressVote] = useState([]);

  const onChangeUser = (target) => {
		const item = users.filter(item => item.name === target.innerText);
		setUser(item[0]);
  };

  const addVote = (data) => {
    const id = makeVoteId(voteData);
    const newVoteData = { id, ...data};
    sortVoteList([...voteData, newVoteData]);
    setIsCreate(false);
  };

  const onModifyCard = (id) => {
    setVoteInfo(findVoteInfo(id, voteData));
    setIsModify(state => !state);
  }

  const modifyVote = (data) => {
    console.log(data);
    sortVoteList(updateVoteList(data, voteData));
    setIsModify(false);
  };

  const onDetailCard = (id) => {
    setVoteInfo(findVoteInfo(id, voteData));
    setIsDetail(state => !state);
  }

  const deleteVote = () => {
    if(selectItemId) {
      setIsPopup(state => !state);
      // TODO: 삭제 되었습니다. 팝업
      sortVoteList(deleteVoteList(selectItemId, voteData));
    }
  };

  const onOpenPopup = (text,id) => {
    setPopupText(text);
    setSelectItemId(id);
		setIsPopup(state => !state);
  };


  const updateVote = (data) => {
    sortVoteList(updateVoteList(data, voteData));
  };

  const sortVoteList = (list) => {
    setVoteData(list);
    localStorage.setItem('@voteData',JSON.stringify(list));
    const {newProgressVote, newEndVote} = formatVoteList(list);
    setEndVote(newEndVote);
    setProgressVote(newProgressVote)
  };

  useEffect(() => {
    const mockData = localStorage.getItem('@voteData');
    if(!mockData){
      sortVoteList(voteList);
    }else {
      sortVoteList(JSON.parse(mockData));
    }
  }, []);

  return (
    <div className="App">
      <ToastProvider placement={'top-center'}>
        <Header users={users} name={user.name} onChangeUser={onChangeUser}/>
        <Container user={user} onHeaderBtnClick={() => setIsCreate(true)}>
          <CardList title={'진행중인 투표'} cardList={progressVote} user={user} updateVote={updateVote} deleteVote={onOpenPopup} onModifyCard={onModifyCard} onDetailCard={onDetailCard} />
          <CardList title={'종료된 투표'} isEndVote cardList={endVote} user={user} onDetailCard={onDetailCard} />
        </Container>
        {
          isCreate && <CreateCardModal user={user} addVote={addVote} onClose={() => setIsCreate(false)} />
        }
        {
          isPopup && <Popup text={popupText} btnName={'삭제'} onConfirm={deleteVote} onClose={onOpenPopup} />
        }
        {
          isDetail && <DetailCardModal data={voteInfo} onClose={onDetailCard}/>
        }
        {
          isModify && <ModifyCardModal data={voteInfo} modifyVote={modifyVote} onClose={onModifyCard}/>
        }
      </ToastProvider>
    </div>
  );
}

export default App;
