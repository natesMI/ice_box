import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import ICONS from '../styles/icons';
import FoodItemTable from './foodItemTable';

const confirmedItems = {};

class FoodItemInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
			autoScrollBodyContent: true,
			newItems: ['Eggs', 'Arugula'],
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	discardItems(item) {
		confirmedItems[item] = !confirmedItems[item];
		console.log('Discarded Items', confirmedItems);
	}

	speechRecognitionInit() {
		console.log('Im running');

		/* eslint-disable */

		const SpeechRecognition = webkitSpeechRecognition;
		const recognition = new SpeechRecognition();

		/* eslint-enable */

		// const SpeechGrammarList = webkitSpeechGrammarList;
		// const SpeechRecognitionEvent = SpeechRecognitionEvent;
		// const recognition = new SpeechGrammarList();
		// const speechRecognitionList = new SpeechGrammarList();
		// speechRecognitionList.addFromString(grammar, 1);
		recognition.interimResults = true;

		let speechFlag = false;
		// const speechResults = [];


		recognition.onresult = (event) => {
			for (let i = event.resultIndex; i < event.results.length; ++i) {
				const identificated = event.results[i][0].transcript;
				if (event.results[i].isFinal) {
					console.log('Final sentence is : ', identificated);
					const tempRes = identificated.split('next');
					// speechResults.push(tempRes);
					tempRes.forEach((item) => { confirmedItems[item] = true; });
					this.setState({ newItems: tempRes });
					console.log('this is state.newItems: ', this.state.newItems);
				} else {
					console.log('I understood : ', identificated);
				}
			}
		};
			//     console.log(event.results[0][0].transcript);


		recognition.onerror = (event) => {
			console.log('error is : ', event);
		};
		recognition.onstart = () => {
			console.log('recognition started');
		};
		recognition.onend = () => {
			console.log('recognition on end fired');
		};

		if (!speechFlag) {
			console.log('speechFlag is false');
			console.log('start recognition');
			recognition.start();
			speechFlag = true;
		} else {
			console.log('speechFlag is true');
			console.log('stop recognition');
			recognition.stop();
			speechFlag = false;
		}
	}

		// make an array out of the Speech user input
		// map that array to the component state

	handleOpen() {
		this.speechRecognitionInit();
		this.setState({ open: true });
	}

	handleClose() {
		this.props.submit(confirmedItems);
		this.setState({ open: false });
	}

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary
				onTouchTap={this.handleClose}
			/>,
			<FlatButton
				label="Submit"
				primary
				keyboardFocused
				onTouchTap={this.handleClose}
			/>,
		];

		return (
			<div>
				<IconButton
					tooltip="Speech"
					className="icebox-toolbar-speech"
					label="Dialog"
					onTouchTap={this.handleOpen}
				>
					<SvgIcon className="icebox-toolbar-svgicon-speech">
						<path d={ICONS.Speech.d} />
					</SvgIcon>
				</IconButton>
				<Dialog
					title="Add Food with Voice"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					<SvgIcon className="icebox-toolbar-svgicon-speech">
						<path d={ICONS.Speech.d} />
					</SvgIcon>
					<div> Read the names of your foods out loud, as you load them into the refrigerator.</div>
					<div> After each food say "next" and when you are done say "end" like this:</div>
					<div>"Tomatoes..next..Milk..next..Chicken...end"</div>
					<FoodItemTable items={this.state.newItems} discarded={this.discardItems} />
				</Dialog>
			</div>
		);
	}

}

FoodItemInput.propTypes = {
	submit: React.PropTypes.func,
};

export default FoodItemInput;
