<<<<<<< HEAD
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';
import { RaisedButton, MenuItem, Snackbar } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsySelect, FormsyText, FormsyToggle } from 'formsy-material-ui/lib';
import { doCategoryReq } from '../../redux/actions/store/category';
import { doItemCreate, showSnackbar } from '../../redux/actions/store/new_item';
import VideoPanel from './VideoPanel';

const mainStyle = { width: '100%', padding: 0 };

const spinnerStyle = { margin: 'auto', display: 'block', padding: 5 };

class NewItem extends React.Component {
  constructor(props) {
    super(props);

    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSnackbarSuccessRequestClose = this.handleSnackbarSuccessRequestClose.bind(this);
    this.handleSnackbarErrorRequestClose = this.handleSnackbarErrorRequestClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { canSubmit: false };
  }

  componentWillMount() {
    this.props.dispatch(doCategoryReq());
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  handleSnackbarSuccessRequestClose(reason) {
    if (reason !== 'clickaway' && !this.props.newItem.error) {
      window.location.reload();
    }
  }

  handleSnackbarErrorRequestClose() {
    this.props.dispatch(showSnackbar());
  }

  handleSubmit(data) {
    const fd = new FormData();
    
    fd.append('name', data.name);
    fd.append('category', data.category);
    fd.append('price', data.price);
    fd.append('currency', data.currency);
    fd.append('paymentOptions', data.paymentOptions);
    fd.append('certificate', data.certificate);
    fd.append('itemDescription', data.itemDescription);
    
    if (window.Video) {
      console.log(window.Video);
      fd.append('productVideo', window.Video.getBlob());
    }
    
    
    this.props.dispatch(doItemCreate(fd));
  }

  renderNewItemForm() {
    return (
      <div style={{ width: '300px', margin: '200px auto' }}>
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.handleSubmit}
        >
          <FormsyText
            hintText="Item name"
            name="name"
            validations="isSpecialWords"
            validationError="Please only use letters"
            requiredError="This field is required"
            required
            fullWidth
          />
          <FormsySelect name="category" floatingLabelText="Category" fullWidth required>
            {this.props.categories.categories.map(item => (
              <MenuItem key={item._id} value={item._id} primaryText={item.name} />
            ))}
          </FormsySelect>
          <br />
          <FormsyText
            name="price"
            hintText="Price"
            validations="isNumeric"
            validationError="Please provide a number"
            fullWidth
            required
            requiredError="This field is required"
          />
          <FormsySelect name="currency" floatingLabelText="Currency" required fullWidth>
            <MenuItem value="USD" primaryText="USD" />
            <MenuItem value="EUR" primaryText="EUR" />
          </FormsySelect>
          <FormsySelect name="paymentOptions" floatingLabelText="Payment" required fullWidth>
            <MenuItem value="Paypal" primaryText="Paypal" />
            <MenuItem value="Credit Card" primaryText="Credit Card" />
            <MenuItem value="Bitcoin" primaryText="Bitcoin" />
          </FormsySelect>
          <FormsyToggle name="certificate" label="Certificate" />
          <FormsyText
            name="itemDescription"
            hintText="Description"
            validations="isAlphanumeric"
            validationError="Please only use letters and/or numbers"
            multiLine
            fullWidth
            required
          />
          <VideoPanel />
          <br />
          {!this.props.newItem.loading &&
            <RaisedButton
              label="Send"
              type="submit"
              primary={false}
              fullWidth
              disabled={!this.state.canSubmit}
            />}
        </Formsy.Form>
        {this.props.newItem.loading &&
          !this.props.newItem.success &&
          <CircularProgress size={50} style={spinnerStyle} />}
        <Snackbar
          open={this.props.newItem.success}
          message="Success! Item created."
          autoHideDuration={2000}
          onRequestClose={this.handleSnackbarSuccessRequestClose}
        />
        <Snackbar
          open={this.props.newItem.showSnackbar}
          message={this.props.newItem.message}
          autoHideDuration={2000}
          onRequestClose={this.handleSnackbarErrorRequestClose}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="container" style={mainStyle}>
        {this.renderNewItemForm()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const categories = state.categories;
  const newItem = state.newItem;

  return { categories, newItem };
}

export default connect(mapStateToProps)(NewItem);

=======
import React from 'react';
import {connect} from 'react-redux';
import {
  TextField,
  RaisedButton,
  SelectField,
  MenuItem,
  Toggle
} from 'material-ui';
import { doCategoryReq } from '../../redux/actions/store/category';
import { doItemCreate } from '../../redux/actions/store/new_item';


const mainStyle = {
  width: '100%',
  padding: 0,
};

class NewItem extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      category: '',
      price: 0,
      paymentOptions: '',
      certificate: false,
      itemDescription: ''
    };
  }

  componentWillMount() {
      this.props.dispatch(doCategoryReq());
  }

  renderNewItemForm() {
    return (
      <div style={{ width: '300px', margin: '200px auto' }}>
        <TextField
          hintText='Item name'
          onChange={(e, val) => {
            const toState = {
                name: val
            };

            this.setState(toState);
          }}
          fullWidth={true}
        />
        <SelectField
          floatingLabelText="Category"
          value={this.state.category}
          onChange={(e, ind, val) => {
            const toState = {
                category: val
            };

            this.setState(toState);
          }}
          fullWidth={true}
        >
            {this.props.categories.categories.map(item => {
                return (
                    <MenuItem
                        value={item._id}
                        primaryText={item.name}
                    />
                );
            })}
        </SelectField>
        <br/>
        <TextField
          hintText='Price'
          type='number'
          onChange={(e, val) => {
            this.setState({ price: val });
          }}
          fullWidth={true}
        />
        <SelectField
          floatingLabelText="Currency"
          value={this.state.currency}
          onChange={(e, ind, val) => {
            const toState = {
              currency: val
            };

            this.setState(toState);
          }}
          fullWidth={true}
        >
            <MenuItem
                value='USD'
                primaryText='USD'
            />
            <MenuItem
                value='BTC'
                primaryText='BTC'
            />
        </SelectField>
        <SelectField
          floatingLabelText="Payment"
          value={this.state.paymentOptions}
          onChange={(e, ind, val) => {
            const toState = {
              paymentOptions: val
            };

            this.setState(toState);
          }}
          fullWidth={true}
        >
            <MenuItem
                value='Paypal'
                primaryText='Paypal'
            />
            <MenuItem
                value='Credit Card'
                primaryText='Credit Card'
            />
            <MenuItem
                value='Bitcoin'
                primaryText='Bitcoin'
            />
        </SelectField>
        <Toggle
            label='Certificate'
            onToggle={(e, isChecked) => {
                const toState = {
                    certificate: isChecked
                };

                this.setState(toState);
            }}
        />
        <TextField
          hintText='Description'
          multiLine={true}
          onChange={(e, val) => {
            this.setState({ itemDescription: val });
          }}
          fullWidth={true}
        />
        <p>{this.props.newItem.succes ? 'Success!' : ''}</p>
        <p>{this.props.newItem.error ? 'An error has occurred' : ''}</p>
        <RaisedButton
          label="Send"
          primary={false}
          fullWidth={true}
          onClick={() => {
            this.props.dispatch(doItemCreate(this.state));
          }}
        />
      </div>
    );
  }

  render() {
    return ( 
      <div className="container" style={mainStyle}>
        {this.renderNewItemForm()}
      </div>
    );
  }

}

function mapStateToProps(state) {
    const categories = state.categories;
    const newItem = state.newItem;

    return {
        categories,
        newItem
    };
}

export default connect(mapStateToProps)(NewItem);
>>>>>>> 5-front-page