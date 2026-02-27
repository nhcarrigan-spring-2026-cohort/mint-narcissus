export const filterOutfits = (outfits, filters) => {
  const {
    search,
    category,
    interviewType,
    availability,
    topSize,
    bottomSize,
    height,
    fitType,
  } = filters;

  return outfits.filter((outfit) => {
    const matchesSearch =
      !search ||
      outfit.title.toLowerCase().includes(search.toLowerCase()) ||
      outfit.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !category || category === 'None' || outfit.category === category;

    const matchesInterview =
      !interviewType ||
      interviewType === 'None' ||
      outfit.interviewTypes.includes(interviewType);

    const matchesAvailability =
      !availability ||
      availability === 'None' ||
      outfit.status === availability;

    const matchesTop =
      !topSize || topSize === 'None' || outfit.size.topSize === topSize;

    const matchesBottom =
      !bottomSize ||
      bottomSize === 'None' ||
      outfit.size.bottomSize === bottomSize;

    const matchesHeight =
      !height || height === 'None' || outfit.size.height === height;

    const matchesFit =
      !fitType || fitType === 'None' || outfit.size.fitType === fitType;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesInterview &&
      matchesAvailability &&
      matchesTop &&
      matchesBottom &&
      matchesHeight &&
      matchesFit
    );
  });
};
