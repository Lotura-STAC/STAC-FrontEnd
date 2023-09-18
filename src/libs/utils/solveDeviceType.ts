export const solveDeviceType = (device_type: string) => {
  return device_type === "세탁기"
    ? "WASH"
    : device_type === "건조기"
    ? "DRY"
    : "";
};
