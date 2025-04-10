import { applets } from '@web-applets/sdk';
import { z } from 'zod';
import sdk from '@farcaster/frame-sdk';

// Define Zod schema for tarot card data validation
const TarotCardSchema = z.object({
  name: z.string(),
  name_short: z.string(),
  meaning_up: z.string()
});

type TarotCard = z.infer<typeof TarotCardSchema>;

// Define API response schema with at least one card
const TarotResponseSchema = z.object({
  cards: z.array(TarotCardSchema).nonempty()
});

// Type definition for our card data
type CardData = {
  name: string;
  id: string;
  meaning: string;
};

// Function to get correct image path whether in development or production
function getImagePath(filename: string): string {
  // Use relative paths for better compatibility with different hosting environments
  return `./cards/${filename}.jpeg`;
}

// Register the applet
const self = applets.register();

// Function to convert a tarot card to card data
function tarotCardToCardData(card: TarotCard): CardData {
  return {
    name: card.name,
    id: card.name_short,
    meaning: card.meaning_up
  };
}

// Initialize Farcaster SDK if available
async function initializeFarcaster() {
  try {
    if (typeof window !== 'undefined' && sdk) {
      const context = await sdk.context;
      console.log('Farcaster context:', context);
      sdk.actions.ready();
    }
  } catch (error) {
    console.error('Error initializing Farcaster SDK:', error);
  }
}

// Define the 'draw' action handler to fetch a random tarot card
self.setActionHandler('draw', async () => {
  try {
    const response = await fetch('https://tarotapi.dev/api/v1/cards/random?n=1');
    const data = await response.json();
    
    // Validate API response using Zod
    const parseResult = TarotResponseSchema.safeParse(data);
    
    if (parseResult.success) {
      // We've used nonempty() so cards[0] is guaranteed to exist
      const card = parseResult.data.cards[0];
      
      // Update the shared data object with card info
      self.data = tarotCardToCardData(card);
    } else {
      console.error('Invalid API response:', parseResult.error);
    }
  } catch (error) {
    console.error('Error fetching tarot card:', error);
  }
});

// Whenever the data is updated, update the view
self.ondata = () => {
  if (!self.data) return;
  
  const tarotMainElement = document.querySelector('.tarot-main');
  if (tarotMainElement) {
    tarotMainElement.innerHTML = `
      <div class="card-container">
        <img class="card-image" src="${getImagePath(self.data.id)}" alt="${self.data.name}" />
        <div class="card-info">
          <h1>${self.data.name}</h1>
          <p class="meaning">${self.data.meaning}</p>
        </div>
      </div>
      <button id="draw-card" class="draw-button">Draw Another Card</button>
    `;
    
    // Re-attach event listener to the new button
    const drawButton = document.getElementById('draw-card');
    if (drawButton) {
      drawButton.addEventListener('click', handleDrawButtonClick);
    }
  }
};

// Function to handle the draw button click
function handleDrawButtonClick() {
  // Create a function to mimic the action handler
  const drawHandler = async () => {
    try {
      const response = await fetch('https://tarotapi.dev/api/v1/cards/random?n=1');
      const data = await response.json();
      
      // Validate API response using Zod with nonempty array validation
      const parseResult = TarotResponseSchema.safeParse(data);
      
      if (parseResult.success) {
        // We've used nonempty() so cards[0] is guaranteed to exist
        const card = parseResult.data.cards[0];
        
        // Update the shared data object with card info
        self.data = tarotCardToCardData(card);
      } else {
        console.error('Invalid API response:', parseResult.error);
      }
    } catch (error) {
      console.error('Error fetching tarot card:', error);
    }
  };
  
  // Execute the handler
  drawHandler();
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Find the initial draw button
  const initialDrawButton = document.getElementById('draw-card');
  if (initialDrawButton) {
    initialDrawButton.addEventListener('click', handleDrawButtonClick);
  }
  
  // Initialize Farcaster SDK
  initializeFarcaster();
  
  // Auto-draw the first card when the page loads
  handleDrawButtonClick();
});
