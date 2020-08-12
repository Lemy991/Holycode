import React from 'react';
import CommentFeed from './CommentFeed';

/**
 * @description Component for displaying tab-like structure
 * @param {Object[]} items list of tab-like structures to be displayed
 * @param {Integer} selected currently selected tab
 * @param {Function} setSelected function to be passed to component to handle tab selection
 * @param {Function} addComment function to be passed to component to handle comment adding on store level
 */
function TabContainer({items, selected, setSelected, addComment}) {

    /**
     * @description function for handeling tab selection
     * @param {Integer} i currentli selected tab
     */
    function onClick(i){
        setSelected(i);
    }

    return(
        <div>
            <div className='tab-titles'>
                {
                    items.map((item, index) => {
                        return  <div className={index === selected ? 'selected-tab' : 'tab'} onClick={() => onClick(index)} 
                                    key={item.id}>
                                    <h2>{item.title}</h2>
                                </div>
                    })
                }
            </div>
            <div className='tab-body'>
                {
                    items[selected].id === 2 ? 
                    <CommentFeed comments={items[selected].body} addComment={addComment}></CommentFeed>
                    : items[selected].body
                }
            </div>
        </div>
    );
}

export default TabContainer;