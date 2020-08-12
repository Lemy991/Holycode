import React, { forwardRef, useState, useEffect } from 'react';
import TabContainer from './TabContainer';
import Utility from '../Utils/Utility';

/**
 * @description Modal view component for displaying details about selected item
 * @param {Object} item Object containing all details about product
 * @param {Function} addCommentWithId function to be passed to component to handle comment adding on store level
 */
const ItemDetails = forwardRef(({item, addCommentWithId}, ref) => {

    /**
     * @description index of currently displayed image of list of images
     */
    const [index, setIndex] = useState(0);

    /**
     * @description list of tab items to be displayed in table below image
     */
    const [items, setItems] = useState([]);

    /**
     * @description index of selected tab
     */
    const [selected, setSelected] = useState(0);

    /**
     * @description flag indicating whether previous button is visible or not
     */
    const [previousHidden, setPreviousHidden] = useState(true);

    /**
     * @description flag indicating whether next button is visible or not
     */
    const [nextHidden, setNextHidden] = useState(false);

    useEffect(() => {
        ref.current.addEventListener("close", () => {
            setIndex(0);
            setSelected(0);
        });
        // initial setting of tab items to be displayed
        setItems([
            {
                id: 0,
                title: 'Description',
                body: item ? item.description : ''
            },
            {
                id: 1,
                title: 'Specification',
                body: item ? item.specification : ''
            },
            {
                id: 2,
                title: 'Comments',
                body: item ? (item.comments ? item.comments : []) : []
            }
        ])
        return () => {
            setIndex(0);
        }
    }, [ref, item])

    useEffect(() => {
        checkVisibility();
        // eslint-disable-next-line
    }, [index]);

    /**
     * @description function for displaying next image in row
     */
    function next(){
        if(item.images.length - 1 > index){
            setIndex(index + 1);
        }
    }

    /**
     * @description function for displaying previous image in row
     */
    function previous(){
        if(index > 0){
            setIndex(index - 1);
        }
    }

    /**
     * @description function for handeling visibility of buttons for switching between images in galery
     */
    function checkVisibility(){
        if(index === 0){
            setPreviousHidden(true);
            setNextHidden(false);
        } else if(index === item.images.length - 1) {
            setPreviousHidden(false);
            setNextHidden(true);
        } else {
            setPreviousHidden(false);
            setNextHidden(false);
        }
    }

    /**
     * @description propagation function for adding comment on currently displayed item
     * @param {Object} newComment Object conataining all necessary information about new comment added
     */
    function addComment(newComment){
        addCommentWithId(newComment, item.id);
    }

    return (
        <dialog  ref={ref} className="front-view">
            {
                item ? 
                <div className='card' onClick={event => {event.stopPropagation()}}> 
                {/* this can affect performance but since this very small app I will leave it like this for simplicity */}
                    <div className='actions'>
                        <div style={{visibility: previousHidden ? 'hidden' : 'visible'}} onClick={previous}>
                            {'<'}
                        </div>
                        <img src={item.images[index].original} alt="not"></img>
                        <div style={{visibility: nextHidden ? 'hidden' : 'visible'}} onClick={next}>
                            {'>'}
                        </div>
                    </div>
                    <h1 className='title'>{Utility.toUpperCase(item.title)}</h1>
                    <div className='body'>
                        <TabContainer selected={selected} setSelected={setSelected} items={items} addComment={addComment}></TabContainer>
                        <div className='tab-price'>{item.price} &#36;</div>
                    </div>
                </div>
                : null
            }
            
        </dialog>
    )})

export default ItemDetails;