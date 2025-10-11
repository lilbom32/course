# Hospitality Vocabulary Update

## New Basic Vocabulary File Added

A new CSV file `hospitality_vocabulary_level_1_basic.csv` has been added to the project containing 142 basic hospitality vocabulary terms.

### File Structure
The CSV file contains the following columns:
- `english`: English term
- `vietnamese`: Vietnamese translation
- `ipa`: IPA pronunciation
- `category`: Category (Front Office, Rooms, Housekeeping, F&B, Service, Basic)
- `definition`: Definition of the term
- `example`: Example sentence
- `level`: Difficulty level (Basic)

### Categories Included
- **Front Office**: Check-in, Check-out, Reservation, Reception, Guest, etc.
- **Rooms**: Single Room, Double Room, Suite, Bedroom, Bathroom, etc.
- **Housekeeping**: Clean, Dirty, Fresh, Vacuum, Dust, Polish, etc.
- **F&B**: Restaurant, Menu, Order, Food, Drink, Coffee, Tea, etc.
- **Service**: Service, Help, Please, Excuse me, Problem, Solution, etc.
- **Basic**: Time, Hour, Minute, Morning, Afternoon, Left, Right, etc.

### Integration
The vocabulary has been integrated into the app by:
1. Adding a new `loadBasicVocabulary()` method to load the CSV file
2. Updating the `mapLevelToKey()` method to handle "Basic" level
3. Modifying the `loadCSVData()` method to load both files
4. Adding debug logging to track loading progress

### Usage
The basic vocabulary terms will now appear in:
- The "Từ vựng cơ bản" (Basic Vocabulary) section
- Search results
- Vocabulary list with filtering
- Quiz questions
- Flashcard practice

### File Location
- `hospitality_vocabulary_level_1_basic.csv` - Main vocabulary file
- `app.js` - Updated to load the new vocabulary
- `index.html` - Already configured to display basic vocabulary

### Testing
To test the integration:
1. Open the app in a web browser
2. Navigate to "Từ vựng cơ bản" (Basic Vocabulary)
3. Verify that the 142 terms are loaded and displayed
4. Check the browser console for the loading confirmation message
