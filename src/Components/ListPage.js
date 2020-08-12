import React from 'react';
import ListItem from './ListItem';

/**
 * @description Component for displying list of products retrieved from web. 
 *              The is no logic here, this is more of a presentation component, logic is stored in parent component
 * @param {Object[]} list list of Objects containing all details about product
 * @param {Function} onClick function for handeling click event on list item
 */
function ListPage({list, onClick}){    
    return (
        <div>
            <div className='logo'>
                <img src='./Big_Toys_Time.svg' alt='Error'></img>
            </div>
            <div className='navigation-pane'>
                <span className='page-info'>Navigation: <a href='Home'>Home</a> / <a href='Toys'>Toys</a> / <a href='Wepons'>Wepons</a></span>
                <span className='page-info'>Total number of items: {list.length}</span>
            </div>
            <div className="list-container">
            {
                list.map((value, index) => {
                    return  <div key={value.id}>
                                <ListItem onClick={onClick} item={value}></ListItem>
                                {index === list.length - 1 ? null : <div className='separator'></div>}
                            </div>  
                })
            }
            </div>
        </div>
    );
}

export default ListPage;