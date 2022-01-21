import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form, Row, Col, Select } from 'react-bootstrap';

import {
  MovableCardWrapper,
  CardHeader,
  CardRightContent,
  CardTitle,
  Detail,
  Footer
} from './styles/Base'
import InlineInput from './widgets/InlineInput'
import Tag from './components/Card/Tag'
import DeleteButton from './widgets/DeleteButton'

class Card extends Component {
  onDelete = e => {
    this.props.onDelete()
    this.props.openModal()
    e.stopPropagation()
  }

  render()  {
    const {
      showDeleteButton,
      style,
      tagStyle,
      onClick,
      onDelete,
      onChange,
      className,
      id,
      title,
      label,
      description,
      tags,
      taskName,
      cardDraggable,
      editable,
      openModal,
      t
    } = this.props

    const updateCard = (card) => {
      onChange({...card, id})
    }

    return (
      // <MovableCardWrapper
      //   data-id={id}
      //   onClick={onClick}
      //   style={style}
      //   className={className}
      // >
      //   <CardHeader>
      //     <CardTitle draggable={cardDraggable}>
      //       {editable ? <InlineInput value={title} border placeholder={t('placeholder.title')} resize='vertical' onSave={(value) => updateCard({title: value})} /> : title}
      //     </CardTitle>
      //     <CardRightContent>
      //       {editable ? <InlineInput value={label} border placeholder={t('placeholder.label')} resize='vertical' onSave={(value) => updateCard({label: value})} /> : label}
      //     </CardRightContent>
      //     {showDeleteButton && <DeleteButton onClick={this.onDelete} />}
      //   </CardHeader>
      //   <Detail>
      //     {editable ? <InlineInput value={description} border placeholder={t('placeholder.description')} resize='vertical' onSave={(value) => updateCard({description: value})} /> : description}
      //   </Detail>
      //   {tags && tags.length> 0 && (
      //     <Footer>
      //       <button className="btn btn-sm btm-primary" onClick={openModal}>Test </button>
      //       {tags.map(tag => (
      //         <Tag key={tag.title} {...tag} tagStyle={tagStyle} />
      //       ))}
      //     </Footer>
      //   )}
      // </MovableCardWrapper>
      <div className="card bg-primary p-0">
      <div className='card-body p-2'>
          <div className="card-header text-white">
             {taskName}
          </div>
          
      </div>
  </div>
      )
  }
}

Card.propTypes = {
  showDeleteButton: PropTypes.bool,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  style: PropTypes.object,
  tagStyle: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array,

  taskName:PropTypes.string,
  end_date:PropTypes.string
}

Card.defaultProps = {
  showDeleteButton: true,
  onDelete: () => {},
  onClick: () => {},
  style: {},
  tagStyle: {},
  title: 'no title',
  description: '',
  label: '',
  tags: [],
  className: '',

  taskName:'',
  end_date:''
}

export default Card
