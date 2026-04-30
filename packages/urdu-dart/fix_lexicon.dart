import 'dart:io';

void main() {
  final file = File('lib/src/compound/lexicon_data.dart');
  final lines = file.readAsLinesSync();
  
  final setLines = <String>{};
  final out = <String>[];
  
  for (final line in lines) {
    if (line.trim().startsWith("'")) {
      if (setLines.add(line)) {
        out.add(line);
      }
    } else {
      out.add(line);
    }
  }
  
  file.writeAsStringSync(out.join('\n'));
}
