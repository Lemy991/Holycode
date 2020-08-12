import React, { useState, useEffect } from 'react';
import Utility from '../Utils/Utility'

/**
 * @description Component for displaying single item in list view
 * @param {Object} item Object containing all details about product
 * @param {Function} onClick function for handeling click event on list item
 */
function ListItem({item, onClick}){

    /**
     * @description varable for iterating through set of images 
     */
    let index = 0;

    /**
     * @description current image to be displayed as tumbnail
     */
    const [current, setCurrent] = useState(item.images[index]);

    /**
     * @description function for swithching currently displayed image in circle
     */
    function getImmage(){
        if(index === item.images.length - 1){
            index = 0;
        } else {
            index++;
        }
        setCurrent(item.images[index]);
    }

    useEffect(() => {
        let t = setInterval(getImmage,1000);   
        return function cleanup() {
            clearInterval(t);
          };
    });

    return (
        <div onClick={event => onClick(event, item)} className="list-item">
            <img id="item-tumbnail" src={current.thumb} alt="not"></img>
            <div id="item-title"><b>{Utility.toUpperCase(item.title)}</b></div>
            <div id="item-price"><b>{item.price} &#36;</b></div>
        </div>
    );
}

export default ListItem;