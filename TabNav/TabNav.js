import React, { Component } from 'react';
import ReactNative, {
	Navigator,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';

import styles from './Styles';

/**TabNavBar
 * @prop {Array} tabs - Array of objects to use as the Navigator's route stack
 * @prop {Function} renderScene - Function that will render and return the current
 * scene will be provided [route] and [navigator] as arguments
 * @prop {Object} initialTab - The initial tab for navigation
 * @prop {Function} renderPlaceholder - Function that will render and return a scene's
 * placeholder element, so on initial load a full render of each tab isn't necessary
 */
export default class TabNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: this.props.initialTab || this.props.tabs[0],
			navigatedScenes: {},
		};
	}

	render() {
        return <View style={styles.rootContainer}>
			{this.navigator
				? <TabNavBar
					navigator={this.navigator}
					selectedTab={this.state.selectedTab}
					tabs={this.props.tabs}
					/>
				: null}
			<Navigator
				ref={navigator => this.navigator = navigator}
		        initialRouteStack={this.props.tabs}
				initialRoute={this.props.initialTab || this.props.tabs[0]}
				renderScene={this._renderScene.bind(this)}
				configureScene={(route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump}
				onWillFocus={this._onWillFocus.bind(this)}
				sceneStyle={styles.sceneContainer}
				/>
		</View>;
	}

	_onWillFocus(route) {
		let navigatedScenes = this.state.navigatedScenes;
		navigatedScenes[route.name] = true;
		this.setState({
			selectedTab: route,
			navigatedScenes,
		});
	}

	_renderScene(route, navigator) {
		if(!this.state.navigatedScenes[route.name]) {
			// Only render the scene fully if it has been navigated to at least once
			return this._renderPlaceholder(route);
		}
		return this.props.renderScene(route, navigator);
	}

	_renderPlaceholder(route) {
		if(this.props.renderPlaceholder) {
			return this.props.renderPlaceholder();
		}
		return <ActivityIndicator
			animating={true}
			size={'large'}
			style={styles.placeholder}
			/>
	}
}
TabNav.propTypes = {
	tabs: React.PropTypes.array.isRequired,
	renderScene: React.PropTypes.func.isRequired,
	initialTab: React.PropTypes.object,
	renderPlaceholder: React.PropTypes.func,
};



/**TabNavBar
 * @prop {Object} navigator - Navigator's navigator object for navigating the route stack
 * @prop {Object} selectedTab - Currently selected tab
 * @prop {Array} tabs - Array of tabs(routes) to display
 */
class TabNavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: this.props.selectedTab,
		};
	}

	// Update state when selectedTab property changes
	componentWillReceiveProps(nextProps) {
		if(nextProps.selectedTab) {
			this.setState({
				selectedTab: nextProps.selectedTab,
			});
		}
	}

	render() {
		return <View style={styles.tabNavBarContainer}>
			{this._renderTabs()}
		</View>;
	}

	// Render the tabs
	_renderTabs() {
		const navigator = this.props.navigator;
		const selectedTab = this.state.selectedTab;
		if(!navigator) return null;
		return this.props.tabs.map((route, index) => {
			let tabStyles = [
				styles.tabContainer,
				route === selectedTab ? styles.selectedTab : null,
			];
			return <TouchableOpacity onPress={this._onPressTab.bind(this, route)} key={index}>
				<View style={tabStyles}>
					<Text>{route.title}</Text>
				</View>
			</TouchableOpacity>;
		});
	}

	// Navigate to the selected tab
	_onPressTab(route, e) {
		this.props.navigator.jumpTo(route);
	}
}
TabNavBar.propTypes = {
	navigator: React.PropTypes.instanceOf(Navigator).isRequired,
	selectedTab: React.PropTypes.object.isRequired,
	tabs: React.PropTypes.array.isRequired,
};
