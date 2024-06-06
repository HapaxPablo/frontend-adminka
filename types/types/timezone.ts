const TIMEZONES = {
    "": "Все",
    "Etc/GMT+11": "UTC -11",
    "Etc/GMT+10": "UTC -10",
    "Etc/GMT+9": "UTC -9",
    "Etc/GMT+8": "UTC -8",
    "Etc/GMT+7": "UTC -7",
    "Etc/GMT+6": "UTC -6",
    "Etc/GMT+5": "UTC -5",
    "Etc/GMT+4": "UTC -4",
    "Etc/GMT+3": "UTC -3",
    "Etc/GMT+2": "UTC -2",
    "Etc/GMT+1": "UTC -1",
    "Etc/GMT+0": "UTC",
    "Etc/GMT-1": "UTC +1",
    "Etc/GMT-2": "UTC +2",
    "Etc/GMT-3": "UTC +3",
    "Etc/GMT-4": "UTC +4",
    "Etc/GMT-5": "UTC +5",
    "Etc/GMT-6": "UTC +6",
    "Etc/GMT-7": "UTC +7",
    "Etc/GMT-8": "UTC +8",
    "Etc/GMT-9": "UTC +9",
    "Etc/GMT-10": "UTC +10",
    "Etc/GMT-11": "UTC +11",
    "Etc/GMT-12": "UTC +12"
}

export const timezonesArray = Object.keys(TIMEZONES).map(key => ({ value: key, label: TIMEZONES[key as keyof typeof TIMEZONES] }));
