import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {
  MovableCardWrapper,
  CardHeader,
  CardRightContent,
  CardTitle,
  Detail,
  Footer
} from '../styles/Base'

import InlineInput from '../widgets/InlineInput'
import Tag from './Card/Tag'
import DeleteButton from '../widgets/DeleteButton'
import Test from './Test'
import { postData } from '../../../../services/TicketService/TicketTaskTimer'

const url=window.location.href.split('Task/');

class Card extends Component {
  constructor(){
    super();
    this.state = {buttonType: "Start"};
  }

  onDelete = e => {
    this.props.onDelete()
    e.stopPropagation()
  }
  // onStart = e => {
  //   this.props.onStart()
  // }

  render()  {
    const {
      showDeleteButton,
      style,
      tagStyle,
      onClick,
      onDelete,
      onStart,
      onChange,
      className,
      id,
      title,
      label,
      description,
      tags,
      cardDraggable,
      editable,
      t
    } = this.props

    const updateCard = (card) => {
      onChange({...card, id})
    }

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const handleStart = (id,type) =>{
      // setShowTaskModal(true); 
      const temp={
        type:type,
        cardId:id,
        ticketId:url[1],
        dateTime:date+' '+time,
        date:date,
        time:time
      }
      
      this.setState(prevState =>{
        if(prevState.buttonType==="Start")
        {
          return { buttonType: "Stop" }
        }else{
          return { buttonType: "Start" }
        }
    });
      postData(temp).then(res=>{
        console.log(res);
      })
  }

    return (
      //Display Card
     <MovableCardWrapper
        data-id={id}
        style={style}
        className={className}
      >
         {/* <CardHeader> 
          <CardTitle draggable={cardDraggable}>
            {editable ? <InlineInput value={title} border placeholder={t('placeholder.title')} resize='vertical' onSave={(value) => updateCard({title: value})} /> : title}
          </CardTitle>
          <CardRightContent>
            {editable ? <InlineInput value={label} border placeholder={t('placeholder.label')} resize='vertical' onSave={(value) => updateCard({label: value})} /> : label}
          </CardRightContent>
          {showDeleteButton && <DeleteButton onClick={this.onDelete} />}
        </CardHeader>
        <Detail>
          {editable ? <InlineInput value={description} border placeholder={t('placeholder.description')} resize='vertical' onSave={(value) => updateCard({description: value})} /> : description}
        </Detail>
        {tags && tags.length> 0 && (
          <Footer>
            {tags.map(tag => (
              <Tag key={tag.title} {...tag} tagStyle={tagStyle} />
            ))}
          </Footer>
        )} */}
      
          {/* {editable ? <InlineInput value={title} border placeholder={t('placeholder.title')} resize='vertical' onSave={(value) => updateCard({title: value})} /> : title} */}
         <div style={{wordWrap:'break-wrap'}} onClick={onClick}>
          {title} 
          </div>
          <div>
            <Test onHandleStart={handleStart} cardId={id} show={this.state.buttonType}/>
          </div>
          
        </MovableCardWrapper>
      )
  }
}

Card.propTypes = {
  showDeleteButton: PropTypes.bool,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  onStart: PropTypes.func,
  style: PropTypes.object,
  tagStyle: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array,
}

Card.defaultProps = {
  showDeleteButton: true,
  onDelete: () => {},
  onClick: () => {},
  onStart: () => {},
  style: {},
  tagStyle: {},
  title: 'no title',
  description: '',
  label: '',
  tags: [],
  className: ''
}

export default Card
