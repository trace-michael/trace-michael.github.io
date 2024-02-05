import 'package:flutter/material.dart';
import 'package:notes_widget/models/notes_model.dart';
import 'package:notes_widget/screens/create_notes.dart';
import 'package:notes_widget/screens/widgets/note_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Note> notes = List.empty(growable: true);
  bool isListView = true;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const Drawer(),
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'NOTES'
            ),

            IconButton(onPressed: (){
              setState(() {
                isListView = !isListView;
              });
            }, icon: Icon(isListView ? Icons.splitscreen_rounded :
              Icons.grid_view_rounded,),),
          ],
        ),
      ),
      body: ListView.builder(
        itemCount: notes.length,
        itemBuilder: (context, index) {
          return NoteCard(note: notes[index], index: index, onNoteDeleted:onNoteDeleted);
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) => CreateNotes(onNewNoteCreated: onNewNoteCreated,),
            ),
          );
        },
        child: const Icon(Icons.note_add_rounded),
      ),
    );
  }

  void onNewNoteCreated(Note note) {
    notes.add(note);
    setState(() {});
  }

  void onNoteDeleted(int index) {
    notes.removeAt(index);
    setState(() {});
  }
}
