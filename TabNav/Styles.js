import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	//Tabs
	rootContainer: {
		flex: 1,
	},
	sceneContainer: {
		flex: 1,
	},
	//TabBar
	tabNavBarContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		flex: 0,
		flexDirection: 'row',
		backgroundColor: '#80acd7',
	},
	tabContainer: {
		padding: 16,
	},
	selectedTab: {
		backgroundColor: '#d9eaf8',
	},
});

export default styles;
