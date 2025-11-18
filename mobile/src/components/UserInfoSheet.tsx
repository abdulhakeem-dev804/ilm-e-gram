import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Conversation} from '../types';

const {height} = Dimensions.get('window');

type UserInfoSheetProps = {
  visible: boolean;
  onClose: () => void;
  conversation: Conversation;
  onViewProfile: () => void;
};

const UserInfoSheet: React.FC<UserInfoSheetProps> = ({
  visible,
  onClose,
  conversation,
  onViewProfile,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.sheet}>
          {/* Drag Handle */}
          <View style={styles.dragHandle} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
              <Image
                source={{uri: conversation.avatar}}
                style={styles.profileImage}
              />
              <Text style={styles.username}>{conversation.username}</Text>
              {conversation.isOnline && (
                <View style={styles.activeStatusContainer}>
                  <View style={styles.activeDot} />
                  <Text style={styles.activeStatus}>Active now</Text>
                </View>
              )}
            </View>

            {/* View Profile Button */}
            <TouchableOpacity
              style={styles.viewProfileButton}
              onPress={onViewProfile}
              activeOpacity={0.7}>
              <Icon name="person-outline" size={20} color="#262626" />
              <Text style={styles.viewProfileText}>View Profile</Text>
              <Icon
                name="chevron-forward"
                size={20}
                color="#8e8e8e"
                style={styles.chevron}
              />
            </TouchableOpacity>

            {/* Options */}
            <View style={styles.optionsSection}>
              <TouchableOpacity style={styles.option} activeOpacity={0.7}>
                <Icon name="notifications-outline" size={22} color="#262626" />
                <Text style={styles.optionText}>Mute messages</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.option} activeOpacity={0.7}>
                <Icon name="volume-mute-outline" size={22} color="#262626" />
                <Text style={styles.optionText}>Mute call notifications</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.option} activeOpacity={0.7}>
                <Icon name="time-outline" size={22} color="#262626" />
                <Text style={styles.optionText}>Disappearing messages</Text>
              </TouchableOpacity>
            </View>

            {/* Danger Zone */}
            <View style={styles.dangerSection}>
              <TouchableOpacity style={styles.option} activeOpacity={0.7}>
                <Icon name="ban-outline" size={22} color="#ed4956" />
                <Text style={[styles.optionText, styles.dangerText]}>
                  Restrict
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.option} activeOpacity={0.7}>
                <Icon name="close-circle-outline" size={22} color="#ed4956" />
                <Text style={[styles.optionText, styles.dangerText]}>
                  Block
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.option} activeOpacity={0.7}>
                <Icon name="alert-circle-outline" size={22} color="#ed4956" />
                <Text style={[styles.optionText, styles.dangerText]}>
                  Report
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.8,
    paddingBottom: 20,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#dbdbdb',
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 12,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 6,
  },
  activeStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#44b700',
    marginRight: 6,
  },
  activeStatus: {
    fontSize: 14,
    color: '#8e8e8e',
  },
  viewProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  viewProfileText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#262626',
    marginLeft: 12,
    flex: 1,
  },
  chevron: {
    marginLeft: 'auto',
  },
  optionsSection: {
    marginTop: 8,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dbdbdb',
    paddingBottom: 8,
  },
  dangerSection: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  optionText: {
    fontSize: 15,
    color: '#262626',
    marginLeft: 16,
  },
  dangerText: {
    color: '#ed4956',
  },
});

export default UserInfoSheet;
