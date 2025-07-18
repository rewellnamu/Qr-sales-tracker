import * as Print from 'expo-print';

export const printText = async (text) => {
  try {
    await Print.printAsync({
      html: `<pre>${text}</pre>`
    });
  } catch (error) {
    console.error("Print error:", error);
  }
};
