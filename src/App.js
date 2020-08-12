import React, { useState, useEffect, createRef } from 'react';
import ListPage from './Components/ListPage';
import ItemDetails from './Components/ItemDetails';
import './Style/Global.css'

/**
 * @description Starting point, main component in application
 */
function App() {

  /**
   * @description list of products retrieved from web service
   */
  const [list, setList] = useState([]);

  /**
   * @description integer representing which element of the list has been selected to closer inspection
   */
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('http://private-5815fe-recommendationsknip.apiary-mock.com/products',{
      method: "GET",
    })
    .then(res => res.json())
    .then(data =>
      setList(data)
    )
    .catch(error => console.log(error));
  }, [list.count]);

  /**
   * @description function for handeling click event on list item
   * @param {Object} event Object conatining all info about click event that occured
   * @param {Object} item Currently selected object from list
   */
  function onClick(event, item){
    event.stopPropagation();
    setSelected(item);
    ref.current.showModal();
  }

  /**
   * @description function for handeling click outside of the modal view in order to close it
   */
  function appClick(){
    if(ref.current.open){
      ref.current.scrollTop = 0;
      ref.current.close('close');
    }
  }

  /**
   * @description function for handeling addition of comments on certain item
   * @param {Object} newComment Object containing all information about new comment that needs to be added to list
   * @param {String} id Identifier of item to which comment should be added
   */
  function addComment(newComment, id){
    setList(list.map(item => {
      if(item.id === id){
        item.comments = item.comments ? [...item.comments, newComment] : [newComment]
      }
      return item;
    }))
  }

  const ref = createRef();

  return (
    <div onClick={appClick} className="App">
      <ListPage list={list} onClick={onClick} /> 
      <ItemDetails addCommentWithId={addComment} ref={ref} item={selected}/>
    </div>
  );
}

export default App;
