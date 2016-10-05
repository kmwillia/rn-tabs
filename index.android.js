import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';

import TabNav from './TabNav/TabNav';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabs: [
				{ name: 'apples', title: 'Apples' },
				{ name: 'bananas', title: 'Bananas' },
				{ name: 'cherries', title: 'Cherries' },
			],
		};
	}

	render() {
		return <View style={styles.rootContainer}>
		<TabNav
			tabs={this.state.tabs}
			renderScene={this._renderScene.bind(this)}
			/>
		</View>;
	}

	_renderScene(tab, navigator) {
		switch(tab.name) {
			case 'apples':
			case 'bananas':
			case 'cherries':
			default:
				return <View style={styles.sceneContainer}>
					<Text style={styles.bigText}>{tab.title}</Text>
					<Text>{loremBacon}</Text>
				</View>;
		}
	}

}

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
	sceneContainer: {
		flex: 1,
		padding: 16,
	},
	bigText: {
		fontSize: 48,
	}
});

const loremBacon = `Bacon ipsum dolor amet meatloaf bresaola short ribs ut eu adipisicing ex nulla aliqua ground round reprehenderit corned beef doner deserunt filet mignon. Eiusmod pariatur minim qui. Do chicken ball tip pork belly sirloin tenderloin doner rump incididunt biltong fugiat pariatur. Burgdoggen dolor filet mignon brisket sausage. Venison cillum ex, shoulder proident pastrami sed id ut kielbasa dolore kevin. Et fugiat jowl ullamco pork loin. Shank incididunt doner excepteur, sunt rump kielbasa.

Id jerky shank sirloin ut hamburger. Veniam short ribs pariatur, tri-tip ipsum bacon shankle rump minim aute. Id proident salami, andouille t-bone strip steak non drumstick excepteur fatback aliqua. T-bone biltong minim pork chop irure ut tempor elit chicken.

Elit shank burgdoggen est shoulder salami. Velit chicken capicola non nisi dolor eu minim kevin sed pig ham. Adipisicing beef ribs pork chuck est sint pastrami mollit velit in. Minim qui ribeye shoulder ut, in nisi tenderloin pancetta. Culpa bresaola laboris veniam salami landjaeger meatball turducken pork chop ut in swine. In enim cupidatat, ut shank sausage meatball landjaeger ribeye short loin flank est excepteur adipisicing sirloin.

Meatball spare ribs incididunt elit, cillum minim picanha beef dolor bacon sed. Bacon sunt shoulder dolore. Qui spare ribs eu minim lorem capicola pork belly. Labore short ribs ullamco excepteur. Consequat frankfurter rump occaecat laboris jerky. T-bone aliqua porchetta, ground round tempor duis frankfurter lorem officia dolore ham dolore.

Consectetur ex picanha capicola non. Ham leberkas in proident t-bone hamburger. Shankle nisi ball tip, do bresaola andouille tenderloin spare ribs corned beef pork hamburger sed pariatur reprehenderit. Pastrami do turducken ribeye.`;

AppRegistry.registerComponent('Tabs', () => App);
