import 'package:flutter/material.dart';

void main() {
  runApp(
    const NotesApp(),
  );
}

// ignore: must_be_immutable
class NotesApp extends StatefulWidget {
  const NotesApp({super.key});

  @override
  State<NotesApp> createState() => _NotesAppState();
}

class _NotesAppState extends State<NotesApp> {
  Color backgroundColor = Colors.white;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: backgroundColor,
        appBar: AppBar(
          backgroundColor: Colors.black,
          foregroundColor: Colors.amberAccent,
          actions: [
            IconButton(
              onPressed: () {
                setState(() {
                  if (backgroundColor == Colors.white) {
                    backgroundColor = Colors.blueGrey;
                  } else {
                    backgroundColor = Colors.white;
                  }
                });
              },
              icon: const Icon(Icons.color_lens_rounded),
            ),
            IconButton(
              onPressed: () {},
              icon: const Icon(Icons.picture_as_pdf_rounded),
            ),
            IconButton(
              onPressed: () {},
              icon: const Icon(Icons.search_rounded),
            ),
            IconButton(
              onPressed: () {},
              icon: const Icon(Icons.more_vert_rounded),
            ),
          ],
          title: const Text('NOTES'),
        ),
        drawer: SafeArea(
          child: Drawer(
            child: Column(
              children: [
                DrawerHeader(
                  decoration: const BoxDecoration(
                    color: Colors.black87,
                  ),
                  child: ListTile(
                    onTap: () {},
                    title: const Text(
                      'Notes',
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 20.0,
                        fontStyle: FontStyle.italic,
                      ),
                    ),
                  ),
                ),
                ListTile(
                  onTap: () {},
                  title: const Text(
                    'All Notes',
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 20.0,
                        fontStyle: FontStyle.italic),
                  ),
                ),
                ListTile(
                  onTap: () {},
                  title: const Text(
                    'Shared',
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 20.0,
                        fontStyle: FontStyle.italic),
                  ),
                ),
                ListTile(
                  onTap: () {},
                  title: const Text(
                    'Recycle bin',
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: 20.0,
                        fontStyle: FontStyle.italic),
                  ),
                ),
              ],
            ),
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            showDialog(
              context: context,
              builder: (BuildContext context) {
                final TextEditingController _textEditingController =
                    TextEditingController();

                return AlertDialog(
                  title: const Text('Add Note'),
                  content: TextField(
                    controller: _textEditingController,
                    decoration:
                        const InputDecoration(labelText: 'Note Content'),
                  ),
                  actions: [
                    TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const Text('Cancel'),
                    ),
                    TextButton(
                      onPressed: () {
                        addNote(_textEditingController.text);
                        Navigator.pop(context);
                      },
                      child: const Text('Save'),
                    ),
                  ],
                );
              },
            );
          },
          backgroundColor: Colors.black,
          foregroundColor: Colors.amberAccent,
          child: const Icon(Icons.note_add_rounded),
        ),
      ),
    );
  }

  List<String> notes = [];

  void addNote(String noteContent) {
    setState(
      () {
        notes.add(noteContent);
      },
    );
  }
}
