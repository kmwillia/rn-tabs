import React, { Component } from 'react';
import ReactNative, {
	Navigator,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	UIManager,
} from 'react-native';

import styles from './Styles';


/**TabNavBar
 * @prop {Array} tabs - Array of objects to use as the Navigator's route stack
 * @prop {Object} initialTab - The initial tab for navigation
 * @prop {Function} renderScene - Function that will render and return the current scene will be provided [route] and [navigator] as arguments
 */
class TabNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			navBarHeight: 0,
			selectedTab: this.props.initialTab || this.props.tabs[0],
		};
	}

	render() {
		return <Navigator
			initialRouteStack={this.props.tabs}
			initialRoute={this.props.initialTab || this.props.tabs[0]}
			renderScene={this._renderScene.bind(this)}
			configureScene={(route, routeStack) => Navigator.SceneConfigs.HorizontalSwipeJump}
			navigationBar={this._getNavigationBar()}
			onWillFocus={route => this.setState({selectedTab: route})}
			/>;
	}

	_getNavigationBar() {
		return <TabNavBar
			onLayout={this._setNavBarHeight.bind(this)}
			ref={(ref) => this.navBar = ref}
			selectedTab={this.state.selectedTab} />;
	}

	_setNavBarHeight(e) {
		const height = e.nativeEvent.layout.height;
		this.setState({
			navBarHeight: height,
		});
	}

	_renderScene(route, navigator) {
		if(this.props.renderScene) {
			const sceneContainerStyles = [
				styles.sceneContainer,
				{marginTop: this.state.navBarHeight},
			]
			return <View style={sceneContainerStyles}>
				{this.props.renderScene(route, navigator)}
			</View>;
		} else {
			return <View style={styles.rootContainer}>
				<Text>{'No renderScene function provided'}</Text>
			</View>
		}
	}

}

export default TabNav;


/**TabNavBar
 * @prop {Object} navigator - Navigator's navigator object for navigating the route stack
 * @prop {Object} navState - Information about the Navigator's current navigation state
 * @prop {Object} selectedTab - Currently selected tab
 * @prop {Function} onLayout - Callback for when the TabNavBar is layed out, so the scene's dimensions can be adjusted, and the TabNavBar can be pinned to the top
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
		return <View onLayout={this.props.onLayout} style={styles.tabNavBarContainer}>
			{this._renderTabs()}
		</View>;
	}

	_renderTabs() {
		let navigator = this.props.navigator;
		const navState = this.props.navState;
		const selectedTab = this.state.selectedTab;
		return navState.routeStack.map((route, index) => {
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
