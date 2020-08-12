import React, {useState} from 'react';

/**
 * @description Component for displaying and adding comments
 * @param {String[]} comments list of comments to be passed to component
 * @param {Function} addComment function to be passed to component to handle comment adding on store level
 */
function CommentFeed({comments, addComment}){

    /**
     * @description flag for showing and hiding input field for adding comments
     */
    const [visible, setVisible] = useState(false);

    /**
     * varialbe for storing currently entered comment
     */
    const [comment, setComment] = useState('');

    /**
     * function for formating comment
     */
    function formComment(){
        if(comment !== '') {
            let currentdate = new Date(); 

            let datetime = currentdate.getDate() + "/"
                        + (currentdate.getMonth() + 1)  + "/" 
                        + currentdate.getFullYear() + " @ "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes();

            let formatedComment = {
                date: datetime,
                user: 'Milenko',
                value: comment
            }
            addComment(formatedComment);
        }
    }

    /**
     * function for displaying comment
     * @param {String} comment original object from store
     * @returns formated string for displaying
     */
    function displayComment(comment) {
        return comment.date + '; ' + comment.user + ': ';
    }

    return(
        <div>
            {
                comments.map((comment, index) => {
                    return <div key={index}>
                        <div>{displayComment(comment)}<br/><b>{comment.value}</b></div>
                        <div className='comment-separator'></div>
                    </div>
                })
            }
            {
                visible ? 
                <div>
                    <input className='comment-input' type='text' value={comment} onChange={event => {setComment(event.target.value)}}/> 
                </div>
                : null
            }
            <button className='comment-button' onClick={() => {
                if(visible) {
                    formComment();
                    setComment('');
                } 
                setVisible(!visible);
            }}>
                {visible ? 'Post comment' : 'Add comment'}
            </button>
        </div>
    );
}

export default CommentFeed;