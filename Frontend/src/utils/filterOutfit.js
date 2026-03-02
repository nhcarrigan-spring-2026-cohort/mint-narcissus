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

  if (
    !filters.search &&
    !filters.category &&
    !filters.interviewType &&
    !filters.availability &&
    !filters.topSize &&
    !filters.bottomSize &&
    !filters.height &&
    !filters.fitType
  ) {
    return outfits;
  }

  return outfits.filter((outfit) => {
    const matchesSearch =
      !search ||
      outfit.title.toLowerCase().includes(search.toLowerCase()) ||
      outfit.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !category || category === 'All' || outfit.category === category;

    const matchesInterview =
      !interviewType ||
      interviewType === 'All' ||
      outfit.interviewTypes.includes(interviewType);

    const matchesAvailability =
      !availability || availability === 'All' || outfit.status === availability;

    const matchesTop =
      !topSize || topSize === 'All' || outfit.size.topSize === topSize;

    const matchesBottom =
      !bottomSize ||
      bottomSize === 'All' ||
      outfit.size.bottomSize === bottomSize;

    const matchesHeight =
      !height || height === 'All' || outfit.size.height === height;

    const matchesFit =
      !fitType || fitType === 'All' || outfit.size.fitType === fitType;

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
