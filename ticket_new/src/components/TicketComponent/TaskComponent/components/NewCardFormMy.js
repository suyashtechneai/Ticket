import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  CardForm,
  CardHeader,
  CardRightContent,
  CardTitle,
  CardWrapper,
  Detail
} from '../styles/Base'
import {AddButton, CancelButton} from '../styles/Elements'
import EditableLabel from '../widgets/EditableLabel'

class NewCardForm extends Component {

  updateField = (e) => {
    this.setState({[e.target.name]: e.target.value})
    // console.log(this.state,e.target.name,e.target.value);
  }

  handleAdd = () => {
    this.props.onAdd(this.state)
  }

  render() {
    const {onCancel, t} = this.props
    return (
      // <CardForm>
      //   <CardWrapper>
      //     <CardHeader>
      //       <CardTitle>
      //         <EditableLabel placeholder={t('placeholder.title')} onChange={val => this.updateField('title', val)} autoFocus />
      //       </CardTitle>
      //       <CardRightContent>
      //         <EditableLabel placeholder={t('placeholder.label')} onChange={val => this.updateField('label', val)} />
      //       </CardRightContent>
      //     </CardHeader>
      //     <Detail>
      //       <EditableLabel placeholder={t('placeholder.description')} onChange={val => this.updateField('description', val)} />
      //     </Detail>
      //   </CardWrapper>
      //   <AddButton onClick={this.handleAdd}>{t('button.Add card')}</AddButton>
      //   <CancelButton onClick={onCancel}>{t('button.Cancel')}</CancelButton>
      // </CardForm>

      <div className="card bg-primary p-0">
         <div className='card-body p-1'>
                <div className='form-group'>
                <label className="form-label text-white">Task</label>
                    <input type="text" className='form-control form-control-sm' placeholder='Enter Task Name'
                    name="title"
                    // onChange={val => this.updateField('title', val)}
                    onChange={this.updateField}
                    />
                </div>
                <div className='d-flex justify-content-between'>
                  <button type="button" className='btn btn-sm btn-success text-white mt-2 pt-0 pb-0 m-0' 
                  style={{height:'25px'}}
                  onClick={this.handleAdd} >
                    Add
                  </button>
                  <button type="button" className='btn btn-sm btn-danger text-white mt-2 pt-0 pb-0 m-0' 
                  style={{height:'25px'}}
                  onClick={onCancel}>
                  Cancel
                  </button>
                </div>
            </div>
        </div>
      
    )
  }
}

NewCardForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

NewCardForm.defaultProps = {
}

export default NewCardForm
