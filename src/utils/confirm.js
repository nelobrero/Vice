import { Platform, Alert } from "react-native";

// Alert.alert's multi-button dialogs don't render on web.
// This falls back to the browser's confirm() there, and uses
// the real native Alert everywhere else (iOS/Android).
export function confirmAction(title, message, onConfirm) {
  if (Platform.OS === "web") {
    if (window.confirm(`${title}\n\n${message}`)) {
      onConfirm();
    }
  } else {
    Alert.alert(title, message, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: onConfirm },
    ]);
  }
}