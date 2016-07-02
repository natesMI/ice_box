import React, { Component } from 'react';
import { GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

const styles = {
	paper: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	Beef: {
		backgroundImage: "url('/../../assets/beef.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Beverages: {
		backgroundImage: "url('/../../assets/beverages.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Dairy: {
		backgroundImage: "url('/../../assets/dairy.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Fruit: {
		backgroundImage: "url('/../../assets/fruit.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Grains: {
		backgroundImage: "url('/../../assets/grains.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Lamb: {
		backgroundImage: "url('/../../assets/lamb.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Legumes: {
		backgroundImage: "url('/../../assets/legumes.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Meats: {
		backgroundImage: "url('/../../assets/meats.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Nuts: {
		backgroundImage: "url('/../../assets/nuts.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Pork: {
		backgroundImage: "url('/../../assets/pork.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Poultry: {
		backgroundImage: "url('/../../assets/poultry.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Sauces: {
		backgroundImage: "url('/../../assets/sauces.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Seafood: {
		backgroundImage: "url('/../../assets/seafood.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Sweets: {
		backgroundImage: "url('/../../assets/sweets.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	Vegetables: {
		backgroundImage: "url('/../../assets/vegetables.jpg')",
		backgroundPosition: 'center, center',
		backgroundSize: 'cover',
	},
	cardHeader: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		Title: {
			marginLeft: 10,
			paddingLeft: 10,
			marginRight: 10,
			width: '100%',
			flex: 1,
			fontFamily: '"Helvetica Neue", Helvetica',
			fontSize: '2em',
			color: 'white',
			display: 'flex',
			flexDirection: 'row',
			Group: {
				flex: 2,
				textAlign: 'left',
			},
			CheckboxContainer: {
				flex: 1,
				textAlign: 'right',
				paddingRight: 10,
			},
			Checkbox: {
				marginLeft: 0,
				paddingLeft: 0,
				color: 'white',
			},
		},
	},
	cardBody: {
		flex: 1,
		display: 'flex',
		backgroundColor: 'rgba(0,0,0,0.6)',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		Title: {
			flex: 2,
			fontFamily: '"Helvetica Neue", Helvetica',
			fontSize: '5em',
			color: 'white',
		},
		Subtitle: {
			flex: 2,
			fontFamily: '"Helvetica Neue", Helvetica',
			fontSize: '3em',
			color: 'white',
		},
	},
};

class IceboxListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: false,
			textColor: 'black',
		};
		this.handleChange = this.handleChange.bind(this);
		this.addToTrash = props.addToTrash;
		this.removeFromTrash = props.removeFromTrash;
	}

	componentWillMount() {
		if (this.props.expiration <= 3) {
			this.setState({
				textColor: 'red',
			});
		}
		if (this.props.expiration > 3 && this.props.expiration <= 6) {
			this.setState({
				textColor: 'orange',
			});
		}
		if (this.props.expiration >= 7) {
			this.setState({
				textColor: '#7FFF00',
			});
		}
	}

	handleChange() {
		if (this.state.checked) {
			this.setState({
				checked: false,
			}, () => this.removeFromTrash({ id: this.props.itemID }));
		} else {
			this.setState({
				checked: true,
			}, () => this.addToTrash({ id: this.props.itemID }));
		}
	}

	render() {
		return (
			<GridTile
				className="iceboxListItem"
				style={{ ...styles.gridTile }}
				children={
					<Paper
						style={{ ...styles.paper, ...styles[this.props.foodGroup], border: `1px solid ${this.state.textColor}` }}
						className="iceboxListItem-tile"
						zDepth={5}
					>
						<div style={styles.cardBody}>
							<div style={styles.cardHeader.Title}>
								<span
									style={styles.cardHeader.Title.Group}
									id="icebox-item-food-group"
									data-food-group={this.props.foodGroup}
								>
									{this.props.foodGroup}
								</span>
								<span style={styles.cardHeader.Title.CheckboxContainer}>
									<Checkbox
										iconStyle={{ marginLeft: 0, height: 40, width: 40, stroke: 'white', fill: 'red', paddingRight: 10 }}
										label="Remove"
										labelStyle={{ color: 'red', fontSize: 12, margin: 0, padding: 0 }}
										labelPosition="left"
										checked={this.state.checked}
										onCheck={this.handleChange}
										style={styles.cardHeader.Title.Checkbox}
									/>
								</span>
							</div>
							<span style={styles.cardBody.Title} id="icebox-item-name">{this.props.name}</span>
							<span style={styles.cardBody.Subtitle}>
								Expires in
								<span style={{ color: this.state.textColor }}>
									<span id="icebox-item-expiration">{this.props.expiration}</span>days
								</span>
							</span>
						</div>
					</Paper>
				}
			/>
		);
	}

}


IceboxListItem.propTypes = {
	name: React.PropTypes.string.isRequired,
	foodGroup: React.PropTypes.string.isRequired,
	itemID: React.PropTypes.number,
	expiration: React.PropTypes.number.isRequired,
	addToTrash: React.PropTypes.func,
	removeFromTrash: React.PropTypes.func,
};

export default IceboxListItem;
