# Sahasra Geometry Tutor

A production-quality, Chromebook-friendly web app for 8th-grade geometry tutoring. Designed to help students who missed early-term content catch up and build confidence.

![Sahasra Geometry Tutor](https://img.shields.io/badge/Grade-8th-blue) ![Status](https://img.shields.io/badge/Status-Production%20Ready-green)

## Overview

Sahasra Geometry Tutor is an AI-powered learning platform that helps middle school students master 8th-grade geometry concepts. Upload classroom worksheets, get clear explanations, practice problems with hints, take quizzes, and track progress over time.

### Key Features

- **📸 Worksheet Upload** - Upload or photograph worksheets using Chromebook camera
- **📚 Smart Analysis** - AI analyzes worksheets and identifies topics (with demo fallback)
- **🎓 Learn Mode** - Clear explanations with worked examples and visual aids
- **💪 Practice Mode** - Interactive problems with progressive hints
- **✅ Quiz Mode** - Graded assessments with detailed review
- **📊 Progress Tracking** - Parent/guardian dashboard showing mastery levels
- **🎯 Catch-Up Curriculum** - Focused on weeks 1-3 topics commonly missed

### Target Users

- **Students**: 8th graders needing to catch up on geometry fundamentals
- **Parents/Guardians**: Monitor progress and identify areas needing support

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- A modern browser (Chrome, Firefox, Safari, Edge)
- Optional: OpenAI API key for real worksheet analysis

### Installation

1. Clone or download this repository:

```bash
git clone <repository-url>
cd sahasra-geometry-tutor
```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your OpenAI API key if you want real worksheet analysis:

```
OPENAI_API_KEY=sk-...
```

**Note:** The app works fully in demo mode without an API key.

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Mode

The app includes a **high-quality demo mode** that works without any API keys or external services:

- Sample worksheets on parallel lines & transversals and triangle basics
- Realistic AI-generated explanations and practice problems
- Full quiz functionality with grading
- Progress tracking (stored locally)

This makes the app fully functional for evaluation and testing without API costs.

## Features in Detail

### 1. Home Dashboard

- Quick access to continue learning or upload worksheets
- Overview of progress (topics started, mastered, average score)
- Weeks 1-3 catch-up topic list with status badges

### 2. Worksheet Upload

- **File Upload**: Drag-and-drop or file picker for images/PDFs
- **Camera Capture**: Direct camera access on Chromebook and mobile devices
- **Sample Worksheets**: Try pre-loaded examples without uploading
- **Smart Analysis**: Extracts topic, problems, and concepts (demo or real AI)

### 3. Learning Pages (Explain, Practice, Quiz)

#### Explain Tab
- Clear, age-appropriate explanations
- Key points with visual indicators
- Worked examples with step-by-step solutions
- "Check Your Understanding" micro-questions with instant feedback

#### Practice Tab
- 5+ practice problems per topic
- Progressive hints (2 levels)
- Immediate feedback with explanations
- Tracks progress automatically

#### Quiz Tab
- 8-question assessments
- Multiple choice and short answer
- Instant grading with percentage score
- Detailed review showing correct answers and explanations
- Updates mastery level based on performance

### 4. Progress Dashboard

- **Overview**: Overall score, topics mastered, quizzes taken
- **Catch-Up Progress**: Specific tracking for weeks 1-3 topics
- **Strengths & Focus Areas**: Highlights mastered topics and areas needing review
- **Topic Details**: Per-topic mastery levels and average scores
- **Activity History**: Recent quizzes with dates and scores
- **Recommendations**: Personalized suggestions based on performance

### 5. Curriculum Map

- Complete 8th-grade geometry curriculum (8 topics across 4 weeks)
- Topics organized by week with difficulty levels
- Concepts listed for each topic
- Catch-up topics highlighted

## 8th Grade Curriculum Coverage

**Week 1-3 Topics (Catch-Up Priority):**
1. Points, Lines, and Planes
2. Angles and Angle Relationships
3. Parallel Lines and Transversals (featured in demo)
4. Triangle Basics
5. Introduction to Congruence
6. Perimeter and Area of Polygons

**Week 4+ Topics:**
7. Pythagorean Theorem
8. Coordinate Geometry

## Architecture

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Storage**: localStorage (client-side, no backend required)
- **AI Integration**: OpenAI GPT-4 Vision (optional, with demo fallback)

### Project Structure

```
/app
  /learn/[topicId]    - Learning pages (Explain/Practice/Quiz tabs)
  /upload             - Worksheet upload interface
  /progress           - Parent progress dashboard
  /curriculum         - Full curriculum map
  page.tsx            - Home dashboard
  layout.tsx          - Root layout with metadata

/components/ui        - shadcn/ui component library

/lib
  /tutor              - AI abstraction layer with demo mode
    types.ts          - TypeScript interfaces
    demo-data.ts      - Sample content for demo mode
    index.ts          - API abstraction
  curriculum.ts       - 8th grade geometry curriculum data
  storage.ts          - localStorage wrapper for progress tracking
  utils.ts            - Utility functions
```

### Data Flow

1. **Upload** → Analyze (demo or AI) → Extract topic/problems
2. **Learn** → Load explanation → Practice → Quiz
3. **Quiz Results** → Update mastery → Save to localStorage
4. **Progress** → Aggregate from localStorage → Display insights

### Demo vs. Real AI Mode

The app automatically detects whether `OPENAI_API_KEY` is set:

- **Demo Mode** (default): Uses `demo-data.ts` with realistic sample content
- **Real Mode**: Calls OpenAI Vision API for worksheet analysis

All other features (explanations, practice, quizzes) use the same demo data in both modes for MVP simplicity. In production, these could also call LLM APIs.

## Chromebook Testing

The app is optimized for Chromebook compatibility:

### Camera Access
- Uses HTML5 `<input type="file" capture="environment">` for direct camera access
- Works on Chromebooks with built-in or USB cameras
- Falls back to file picker if camera unavailable

### Performance
- Lightweight bundle (Next.js automatic optimization)
- Client-side rendering for fast interactions
- No heavy dependencies

### Display
- Responsive design works in Chrome browser (no install needed)
- Touch-friendly targets (minimum 44x44px)
- Readable typography at default zoom levels

### Testing Tips

1. **Test Camera Capture**: Click "Take Photo" button in Upload page
2. **Verify Touch Targets**: All buttons should be easily tappable
3. **Check Performance**: App should feel snappy even on lower-end Chromebooks
4. **Offline Behavior**: Demo mode works without internet (after first load)

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add `OPENAI_API_KEY` to environment variables (optional)
4. Deploy

### Other Platforms

The app is a standard Next.js application and can deploy to:
- Netlify
- AWS Amplify
- Google Cloud Run
- Any Node.js hosting platform

**Build command**: `npm run build`  
**Output directory**: `.next`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | OpenAI API key for real worksheet analysis. If not set, app uses demo mode. |

## Browser Support

- ✅ Chrome/Chromium (primary target - Chromebook)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

All modern evergreen browsers are supported.

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- High contrast (WCAG AA compliant)
- Screen reader friendly
- Alt text for visual elements

## Local Storage

The app stores progress data locally using `localStorage`:

- Student profile and name
- Worksheet upload history
- Quiz results and scores
- Practice session history
- Per-topic mastery levels

**Privacy**: All data stays on the user's device. No server-side storage.

To reset progress, use browser DevTools:
```javascript
localStorage.removeItem('sahasra-geometry-tutor');
```

## Customization

### Adding Topics

Edit `/lib/curriculum.ts` to add new topics:

```typescript
{
  id: 'new-topic',
  title: 'New Topic Title',
  week: 5,
  description: 'Description here',
  concepts: ['Concept 1', 'Concept 2'],
  difficulty: 'intermediate',
}
```

### Adding Demo Content

Edit `/lib/tutor/demo-data.ts` to add explanations, practice problems, or quizzes for new topics.

### Changing Colors/Branding

- Update Tailwind colors in `app/globals.css`
- Modify gradients in page components
- Update app name in `/app/layout.tsx` metadata

## Troubleshooting

### Camera Not Working

- Ensure HTTPS (camera requires secure context)
- Check browser permissions for camera access
- Try file upload as fallback

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Demo Mode Not Working

Check browser console for errors. Demo data should load instantly without network calls.

## Future Enhancements

Potential v2 features (out of scope for MVP):

- [ ] Real-time AI generation for all content (not just worksheet analysis)
- [ ] Multiple student profiles
- [ ] Parent/teacher accounts with authentication
- [ ] Cloud sync for progress across devices
- [ ] Diagram drawing tools
- [ ] Video explanations
- [ ] Peer comparison (anonymous)
- [ ] Mobile native app (React Native)
- [ ] Advanced analytics and learning insights

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
- Open a GitHub issue
- Check existing documentation
- Review demo mode for expected behavior

## Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Note**: This is an educational tool designed to supplement, not replace, classroom instruction. Students should work with teachers and parents for comprehensive learning support.
